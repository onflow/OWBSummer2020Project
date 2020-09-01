using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GreatSmiles.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required(ErrorMessage = "First name is required.")]
        [MinLength(2, ErrorMessage = "First name must be at least 2 characters.")]
        [MaxLength(10, ErrorMessage = "First name cannot exceed 10 characters.")]
        [Display(Name = "First Name: ")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required.")]
        [MinLength(3, ErrorMessage = "Last name must be at least 2 characters.")]
        [MaxLength(15, ErrorMessage = "Last name cannot exceed 15 characters.")]
        [Display(Name = "Last Name: ")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        [Display(Name = "Email: ")]
        public string Email { get; set; }

        [Required]
        [Display(Name = "Are you an Official?")]
        public bool IsVerified { get; set; }

        [Display(Name = "What's your story? ")]
        public string UserStory { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters.")]
        [RegularExpression("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$", ErrorMessage = "Password must contain at least 1 letter and 1 number")]
        [Display(Name = "Password: ")]
        [DataType(DataType.Password)]
        [Compare("Confirm", ErrorMessage = "Passwords do not match.")]
        public string Password { get; set; }

        [NotMapped]
        [Display(Name = "Confirm Password: ")]
        [DataType(DataType.Password)]
        public string Confirm { get; set; }
        public List<Photo> AllPhotos { get; set; }
        public List<RSVP> AllSmiledPhotos { get; set; }
        public List<Competition> AllCompetitions { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}