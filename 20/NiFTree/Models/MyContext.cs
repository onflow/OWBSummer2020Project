using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GreatSmiles.Models
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions options) : base(options)
        { }
        public DbSet<User> DbUsers { get; set; }
        public DbSet<Photo> DbPhotos { get; set; }
        public DbSet<RSVP> DbSmilers { get; set; }
        public DbSet<Competition> DbCompetitions { get; set; }
        public DbSet<Entrant> DbEntrants { get; set; }
    }
}