using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace
    GreatSmiles.Models
{
    public class RSVP
    {
        [Key]
        public int SmilerId { get; set; }
        public int VoterId { get; set; }
        public User Voter { get; set; }
        public int PhotoId { get; set; }
        public Photo Photo { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}