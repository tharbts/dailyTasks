using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using dailyTasks.Models;
using dailyTasks.Persistence;
using dailyTasks.Resources;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dailyTasks.Controllers
{
    [Route("/api/dailytasks")]
    public class DailyTasksController : Controller
    {
        private readonly DailyTasksDbContext context;
        private IMapper mapper { get; set; }
        public DailyTasksController(DailyTasksDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Filter filter)
        {
            filter = filter ?? new Filter();

            var dtDbList = await context.DailyTasks.Include(x => x.Tasks).OrderBy(x=> x.Date).ToListAsync();

            if (filter.InitialDate != null)
                dtDbList = dtDbList.Where(x => x.Date.Date >= filter.InitialDate).ToList();

            if (filter.FinalDate != null)
                dtDbList = dtDbList.Where(x => x.Date.Date <= filter.FinalDate).ToList();

            var dtResourceList = new Collection<DailyTasksResource>();

            foreach (var dtDb in dtDbList)
                dtResourceList.Add(mapper.Map<DailyTasks, DailyTasksResource>(dtDb));

            return Ok(dtResourceList);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DailyTasksResource dtResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var dtDb = mapper.Map<DailyTasksResource, DailyTasks>(dtResource);

            await context.DailyTasks.AddAsync(dtDb);
            await context.SaveChangesAsync();

            mapper.Map<DailyTasks, DailyTasksResource>(dtDb, dtResource);

            return Ok(dtResource);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] DailyTasksResource dtResource)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var dtDb = await context.DailyTasks.Include(x=> x.Tasks).SingleOrDefaultAsync(x => x.Id == dtResource.Id);

            if (dtDb == null)
                return BadRequest("Task doesn't exists!");

            if (dtResource.Tasks.Count() == 0)
            {
                context.Tasks.RemoveRange(dtDb.Tasks);
                context.DailyTasks.Remove(dtDb);
                await context.SaveChangesAsync();
                dtResource.Id = 0;
                return Ok(dtResource);
            }

            RemoveTasks(dtResource, dtDb);

            mapper.Map<DailyTasksResource, DailyTasks>(dtResource, dtDb);

            await context.SaveChangesAsync();

            mapper.Map<DailyTasks, DailyTasksResource>(dtDb, dtResource);

            return Ok(dtResource);


        }

        private void RemoveTasks(DailyTasksResource dtResource, DailyTasks dtDb)
        {
            var removed = dtDb.Tasks.Where(x => !dtResource.Tasks.Any(y => y.Id == x.Id));
            foreach (var task in removed.ToList())
                context.Tasks.Remove(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var dtDb = await context.DailyTasks.Include(x => x.Tasks).SingleOrDefaultAsync(x => x.Id == id);

            if (dtDb == null)
                return NotFound("Task doesn't exists!");

            context.Tasks.RemoveRange(dtDb.Tasks);
            context.DailyTasks.Remove(dtDb);

            await context.SaveChangesAsync();

            return Ok();
        }


    }
}