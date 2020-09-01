using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GreatSmiles.Models
{
    public class Entrant
    {
        [Key]
        public int EntrantId { get; set; }

        [Required(ErrorMessage = "Entrant name is required.")]
        [MinLength(2, ErrorMessage = "Entrant name must be at least 2 characters long.")]
        [Display(Name = "Entrant Name: ")]
        public string EntrantName { get; set; }
        public List<Photo> Photos { get; set; }
        public User User { get; set; }
        public List<User> AllUsers { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}