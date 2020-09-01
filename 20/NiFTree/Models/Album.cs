using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace GreatSmiles.Models
{
    public class Album
    {
        [Key]
        public int AlbumId { get; set; }

        [Required]
        public int PhotoId { get; set; }
        public Photo Photo { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}