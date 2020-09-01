using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GreatSmiles.Models
{
    public class Competition
    {
        [Key]
        public int CompetitionId { get; set; }

        [Required(ErrorMessage = "Competition Name is required.")]
        [MinLength(2, ErrorMessage = "Competition Name must be at least 2 characters long.")]
        [Display(Name = "Competition Title: ")]
        public string CompetitionTitle { get; set; }

        [Required(ErrorMessage = "Required Field")]
        [Display(Name = "Description: ")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Required Field")]
        [Display(Name = "Start Date: ")]
        [DataType(DataType.DateTime)]
        public DateTime? Date { get; set; }

        [Required(ErrorMessage = "Required Field")]
        [Display(Name = "End Date: ")]
        [DataType(DataType.DateTime)]
        public DateTime? Time { get; set; }
        public int EntrantId { get; set; }

        [NotMapped]
        public List<User> AllEntrants { get; set; }
        public int PhotoId { get; set; }
        public List<Photo> AllPhotos { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}