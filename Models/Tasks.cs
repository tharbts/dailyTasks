using System.ComponentModel.DataAnnotations;

namespace dailyTasks.Models
{
    public class Tasks
    {
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public bool Done { get; set; }

    }
}