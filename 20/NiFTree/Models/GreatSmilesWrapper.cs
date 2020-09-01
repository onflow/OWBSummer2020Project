using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GreatSmiles.Models
{
    public class GreatSmilesWrapper
    {
        public User UserForm { get; set; }
        public Photo PhotoForm { get; set; }
        public Competition CompetitonForm { get; set; }
        public Entrant EntrantForm { get; set; }
        public List<User> AllUsers { get; set; }
        public List<Photo> AllPhotos { get; set; }
        public List<Competition> AllCompetitions { get; set; }
        public List<Entrant> AllEntrants { get; set; }
    }
}