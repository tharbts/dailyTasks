using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace dailyTasks.Resources
{
    public class DailyTasksResource
    {
        public int Id { get; set; }

        public string Date { get; set; }

        public List<TasksResource> Tasks { get; set; }

        public DailyTasksResource()
        {
            Tasks = new List<TasksResource>();
        }
    }
}