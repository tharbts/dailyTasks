using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace dailyTasks.Models
{
    public class DailyTasks
    {
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public List<Tasks> Tasks { get; set; }

        public DailyTasks()
        {
            Tasks = new List<Tasks>();
        }
    }
}