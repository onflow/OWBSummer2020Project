using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GreatSmiles.Models
{
    public class Photo
    {
        [Key]
        public int PhotoId { get; set; }

        [Required(ErrorMessage = "Photo Name is required.")]
        [MinLength(2, ErrorMessage = "Photo Name must be at least 2 characters long.")]
        [Display(Name = "Photo Name: ")]
        public string PhotoName { get; set; }

        [Required(ErrorMessage = "Required Field")]
        [Display(Name = "Story: ")]
        public string Story { get; set; }

        [Required(ErrorMessage = "Required Field")]
        [Display(Name = "Theme: ")]
        public string Theme { get; set; }
        public string Quality { get; set; }
        public int OfficialId { get; set; }
        public User Official { get; set; }
        public int VoterId { get; set; }
        public List<RSVP> PhotoSmilers { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}