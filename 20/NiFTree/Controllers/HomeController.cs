using System;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using GreatSmiles.Models;

namespace GreatSmiles.Controllers
{
    public class HomeController : Controller
    {
        private MyContext DbContext;

        public HomeController(MyContext context)
        {
            DbContext = context;
        }

        [HttpGet("")]
        public ViewResult LogReg()
        {
            return View("LogReg");
        }

        [HttpPost("users/register")]
        public IActionResult Register(LogRegWrapper FromForm)
        {
            if (ModelState.IsValid)
            {
                if (DbContext.DbUsers.Any(u => u.Email == FromForm.Register.Email))
                {
                    ModelState.AddModelError("Register.Email", "Already registered? Please Log In.");
                    return LogReg();
                }

                if (DbContext.DbUsers.Any(u => u.FirstName == FromForm.Register.FirstName))
                {
                    ModelState.AddModelError("Register.FirstName", "This First Name exists. Please Log In or You should have been faster.");
                    return LogReg();
                }

                PasswordHasher<User> Hasher = new PasswordHasher<User>();
                FromForm.Register.Password = Hasher.HashPassword(FromForm.Register, FromForm.Register.Password);

                DbContext.Add(FromForm.Register);
                DbContext.SaveChanges();


                HttpContext.Session.SetInt32("UserId", FromForm.Register.UserId);
                return RedirectToAction("Dashboard");
            }
            else
            {
                return LogReg();
            }
        }

        [HttpPost("users/login")]
        public IActionResult Login(LogRegWrapper FromForm)
        {
            if (ModelState.IsValid)
            {
                User InDb = DbContext.DbUsers
                    .FirstOrDefault(u => u.Email == FromForm.Login.Email);

                if (InDb == null)
                {
                    ModelState.AddModelError("Login.Email", "Invalid email/password");
                    return LogReg();
                }

                PasswordHasher<LogUser> Hasher = new PasswordHasher<LogUser>();
                PasswordVerificationResult Result = Hasher.VerifyHashedPassword(FromForm.Login, InDb.Password, FromForm.Login.Password);

                if (Result == 0)
                {
                    ModelState
                    .AddModelError("Login.Email", "Invalid email/password");
                    return LogReg();
                }
                HttpContext.Session.SetInt32("UserId", InDb.UserId);
                return RedirectToAction("Dashboard");
            }
            else
            {
                return LogReg();
            }
        }

        [HttpGet("logout")]
        public RedirectToActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("LogReg");
        }

        [HttpGet("dashboard")]
        public IActionResult Dashboard()
        {
            int? LoggedId = HttpContext.Session.GetInt32("UserId");
            if (LoggedId == null)
            {
                return RedirectToAction("LogReg");
            }

            GreatSmilesWrapper WMod = new GreatSmilesWrapper()
            {
                AllPhotos = DbContext.DbPhotos
                    .Include(w => w.Official)
                    .Include(w => w.PhotoSmilers)
                    .ThenInclude(r => r.Voter)
                    .ToList(),
                AllCompetitions = DbContext.DbCompetitions
                    // .Include(c => c.AllEntrants)
                    // .ThenInclude(c => c.FirstName)
                    .ToList(),
                AllEntrants = DbContext.DbEntrants
                    .ToList(),
                UserForm = DbContext.DbUsers
                    .FirstOrDefault(u => u.UserId == (int)LoggedId)
            };
            return View("Dashboard", WMod);
        }

        [HttpGet("leaderboard")]
        public IActionResult Leaderboard()
        {
            int? LoggedId = HttpContext.Session.GetInt32("UserId");
            if (LoggedId == null)
            {
                return RedirectToAction("LogReg");
            }

            GreatSmilesWrapper WMod = new GreatSmilesWrapper()
            {
                AllPhotos = DbContext.DbPhotos
                    .Include(w => w.Official)
                    .Include(w => w.PhotoSmilers)
                    .ThenInclude(r => r.Voter)
                    .ToList(),
                AllCompetitions = DbContext.DbCompetitions
                    // .Include(c => c.AllEntrants)
                    .ToList(),
                AllEntrants = DbContext.DbEntrants
                    .ToList(),
                UserForm = DbContext.DbUsers
                    .FirstOrDefault(u => u.UserId == (int)LoggedId)
            };
            return View("Leaderboard", WMod);
        }

        [HttpGet("photos/new")]
        public IActionResult CreatePhoto()
        {
            int? LoggedId = HttpContext.Session.GetInt32("UserId");
            if (LoggedId == null)
            {
                return RedirectToAction("LogReg");
            }
            return View("CreatePhoto");
        }

        [HttpGet("competitions/new")]
        public IActionResult CreateCompetition()
        {
            int? LoggedId = HttpContext.Session.GetInt32("UserId");
            if (LoggedId == null)
            {
                return RedirectToAction("Dashboard");
            }
            return View("CreateCompetition");
        }

        [HttpPost("competitions/create")]
        public IActionResult AddCompetition(Competition FromForm)
        {
            int? LoggedId = HttpContext.Session.GetInt32("UserId");
            if (LoggedId == null)
            {
                return RedirectToAction("LogReg");
            }

            if (ModelState.IsValid)
            {
                DbContext.Add(FromForm);
                DbContext.SaveChanges();
                return RedirectToAction("Dashboard");
            }
            else
            {
                return CreateCompetition();
            }
        }

        [HttpPost("photos/create")]
        public IActionResult AddPhoto(Photo FromForm)
        {
            int? LoggedId = HttpContext.Session.GetInt32("UserId");
            if (LoggedId == null)
            {
                return RedirectToAction("LogReg");
            }

            FromForm.OfficialId = (int)LoggedId;

            if (ModelState.IsValid)
            {
                DbContext.Add(FromForm);
                DbContext.SaveChanges();
                return RedirectToAction("Dashboard");
            }
            else
            {
                return CreatePhoto();
            }
        }

        [HttpGet("photos/{PhotoId}")]
        public IActionResult Photo(int PhotoId)
        {
            int? LoggedId = HttpContext.Session.GetInt32("UserId");
            if (LoggedId == null)
            {
                return RedirectToAction("LogReg");
            }

            GreatSmilesWrapper GMod = new GreatSmilesWrapper();

            GMod.AllPhotos = DbContext.DbPhotos
                .Include(w => w.Official)
                .Include(w => w.PhotoSmilers)
                .ThenInclude(r => r.Voter)
                .Where(w => w.PhotoId == PhotoId)
                .ToList();
            GMod.UserForm = DbContext.DbUsers
                .FirstOrDefault(u => u.UserId == (int)LoggedId);

            if (GMod == null)
            {
                return RedirectToAction("Dashboard");
            }
            return View("Photo", GMod);
        }

        [HttpGet("/users/{id}")]
        public IActionResult UserDetail(int id)
        {
            int? LoggedUser = HttpContext.Session.GetInt32("UserId");
            if (LoggedUser == null)
            {
                return RedirectToAction("LogReg", "Credentials");
            }

            GreatSmilesWrapper SMod = new GreatSmilesWrapper();

            // SMod.UserForm = DbContext.DbUsers
            //     .Include(u => u.FirstName)
            //     .Include(u => u.UserStory)
            //     .Include(u => u.AllPhotos)
            //     .ThenInclude(p => p.PhotoName)
            //     .ToList();

            // if (ToShow == null)
            // {
            //     return RedirectToAction("Shows", SMod);
            // }


            return View("UserDetail");
        }

        [HttpGet("/competitions/entrants/new")]
        public IActionResult NewEntrant()
        {
            int? uId = HttpContext.Session.GetInt32("UserId");
            if (uId == null)
            {
                return RedirectToAction("LogReg");
            }
            return View("NewEntrant");
        }

        [HttpPost("/competitions/entrants/create")]
        public IActionResult CreateEntrant(Entrant Form)
        {
            int? uId = HttpContext.Session.GetInt32("UserId");
            if (uId == null)
            {
                return RedirectToAction("LogReg");
            }

            if (DbContext.DbEntrants.Any(n => n.EntrantName == Form.EntrantName))
            {
                ModelState.AddModelError("Entrant Name", "A entrant with that name already exists.");
                return NewEntrant();
            }

            if (ModelState.IsValid)
            {
                DbContext.Add(Form);
                DbContext.SaveChanges();
                return RedirectToAction("Dashboard");
            }
            return NewEntrant();
        }

        // [HttpPost("/products/{id}/addentrant")]
        // public IActionResult AddOrder(int id, GreatSmilesWrapper Form)
        // {
        //     int? uId = HttpContext.Session.GetInt32("UserId");
        //     if (uId == null)
        //     {
        //         return RedirectToAction("LogReg");
        //     }

        //     if (!DbContext.Products.Any(s => s.ProductId == id))
        //     {
        //         return RedirectToAction("Products");
        //     }

        //     Form.AddOrderForm.ProductId = id;
        //     DbContext.Add(Form.AddOrderForm);
        //     DbContext.SaveChanges();

        //     return RedirectToAction("Products", new { id = id });
        // }

        // [HttpGet("photos/{PhotoId}/rsvp")]
        // public RedirectToActionResult RSVP(int PhotoId)
        // {
        //     int? LoggedId = HttpContext.Session.GetInt32("UserId");
        //     if (LoggedId == null)
        //     {
        //         return RedirectToAction("LogReg");
        //     }
        //     Photo ToJoin = DbContext.DbPhotos
        //         .Include(w => w.PhotoSmilers)
        //         .FirstOrDefault(w => w.PhotoId == PhotoId);

        //     if (ToJoin == null || ToJoin.VoterId == (int)LoggedId || ToJoin.PhotoSmilers.Any(r => r.SmilerId == (int)LoggedId))
        //     {
        //         return RedirectToAction("Dashboard");
        //     }
        //     else
        //     {
        //         RSVP NewRsvp = new RSVP()
        //         {
        //             SmilerId = (int)LoggedId,
        //             PhotoId = PhotoId
        //         };
        //         DbContext.Add(NewRsvp);
        //         DbContext.SaveChanges();
        //         return RedirectToAction("Dashboard");
        //     }
        // }

        // [HttpGet("photos/{PhotoId}/unrsvp")]
        // public RedirectToActionResult UnRSVP(int PhotoId)
        // {
        //     int? LoggedId = HttpContext.Session.GetInt32("SmilerId");
        //     if (LoggedId == null)
        //     {
        //         return RedirectToAction("LogReg");
        //     }
        //     Photo ToLeave = DbContext.DbPhotos
        //         .Include(w => w.PhotoSmilers)
        //         .FirstOrDefault(w => w.PhotoId == PhotoId);

        //     if (ToLeave == null || !ToLeave.PhotoSmilers.Any(r => r.SmilerId == (int)LoggedId))
        //     {
        //         return RedirectToAction("Photo");
        //     }
        //     else
        //     {
        //         RSVP ToRemove = DbContext.DbSmilers.FirstOrDefault(r => r.SmilerId == (int)LoggedId && r.PhotoId == PhotoId);
        //         DbContext.Remove(ToRemove);
        //         DbContext.SaveChanges();

        //         return RedirectToAction("Dashboard");
        //     }
        // }

        [HttpGet("photos/{PhotoId}/edit")]
        public IActionResult EditPhoto(int PhotoId)
        {
            int? LoggedId = HttpContext.Session.GetInt32("UserId");
            if (LoggedId == null)
            {
                return RedirectToAction("LogReg");
            }

            Photo ToEdit = DbContext.DbPhotos.FirstOrDefault(w => w.PhotoId == PhotoId);

            if (ToEdit == null || ToEdit.OfficialId != (int)LoggedId)
            {
                return RedirectToAction("Dashboard");
            }

            return View("EditPhoto", ToEdit);
        }

        [HttpPost("photos/{PhotoId}/update")]
        public IActionResult UpdatePhoto(int PhotoId, Photo FromForm)
        {
            int? LoggedId = HttpContext.Session.GetInt32("UserId");
            if (LoggedId == null)
            {
                return RedirectToAction("LogReg");
            }

            if (!DbContext.DbPhotos.Any(w => w.PhotoId == PhotoId && w.OfficialId == (int)LoggedId))
            {
                return RedirectToAction("Dashboard");
            }

            FromForm.OfficialId = (int)LoggedId;
            if (ModelState.IsValid)
            {
                FromForm.PhotoId = PhotoId;
                DbContext.Update(FromForm);
                DbContext.Entry(FromForm).Property("CreatedAt").IsModified = false;
                DbContext.SaveChanges();
                return RedirectToAction("Dashboard");
            }
            else
            {
                return EditPhoto(PhotoId);
            }
        }

        [HttpGet("photos/{PhotoId}/delete")]
        public RedirectToActionResult DeletePhoto(int PhotoId)
        {
            int? LoggedId = HttpContext.Session.GetInt32("UserId");
            if (LoggedId == null)
            {
                return RedirectToAction("LogReg");
            }

            Photo ToDelete = DbContext.DbPhotos
                .FirstOrDefault(w => w.PhotoId == PhotoId);

            if (ToDelete == null || ToDelete.OfficialId != (int)LoggedId)
            {
                return RedirectToAction("Dashboard");
            }

            DbContext.Remove(ToDelete);
            DbContext.SaveChanges();
            return RedirectToAction("Photo");
        }
    }
}