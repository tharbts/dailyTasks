using System.Linq;
using AutoMapper;
using dailyTasks.Models;
using dailyTasks.Resources;

namespace dailyTasks.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            MapTasks();
            MapDailyTasks();
        }

        private void MapDailyTasks()
        {
            // Resource to Database
            CreateMap<DailyTasksResource, DailyTasks>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.Tasks, opt => opt.Ignore())
                .AfterMap((r, d, context) =>
                {

                    // Equals
                    var equals = d.Tasks.Where(x => r.Tasks.Any(y => y.Id == x.Id));
                    foreach (var task in equals.ToList())
                        context.Mapper.Map<TasksResource, Tasks>(r.Tasks.FirstOrDefault(e => e.Id == task.Id), task);

                    //Remove Tasks
                    var removed = d.Tasks.Where(x => !r.Tasks.Any(y => y.Id == x.Id));
                    foreach (var task in removed.ToList())
                        d.Tasks.Remove(task);


                    // Add Tasks
                    var added = r.Tasks.Where(x => !d.Tasks.Any(y => y.Id == x.Id));
                    foreach (var task in added.ToList())
                        d.Tasks.Add(context.Mapper.Map<TasksResource, Tasks>(task));
                });

            // Database to Resource
            CreateMap<DailyTasks, DailyTasksResource>();
        }

        private void MapTasks()
        {
            // Resource to Database
            CreateMap<TasksResource, Tasks>();

            // Database to Resource
            CreateMap<Tasks, TasksResource>();
        }
    }
}