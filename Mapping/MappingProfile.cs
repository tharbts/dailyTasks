using System.Linq;
using AutoMapper;
using dailyTasks.Models;

namespace dailyTasks.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<DailyTasks, DailyTasks>()
            .ForMember(x => x.Id, opt => opt.Ignore())
            .ForMember(x => x.Tasks, opt => opt.Ignore())
            .AfterMap((s, d, context) => {

                // Equals
                var equals = d.Tasks.Where(x => s.Tasks.Any(y => y.Id == x.Id));
                    foreach(var task in equals.ToList())
                        context.Mapper.Map<Tasks, Tasks>(s.Tasks.FirstOrDefault(e => e.Id == task.Id), task);

                // Remove Tasks
                var removed = d.Tasks.Where(x => !s.Tasks.Any(y => y.Id == x.Id));
                foreach (var task in removed.ToList())
                    d.Tasks.Remove(task);

                // Add Tasks
                var added = s.Tasks.Where(x => !d.Tasks.Any(y => y.Id == x.Id));
                foreach (var task in added.ToList())
                    d.Tasks.Add(task);
            });

            CreateMap<Tasks, Tasks>()
            .ForMember(x => x.Id, opt => opt.Ignore());
        }
    }
}