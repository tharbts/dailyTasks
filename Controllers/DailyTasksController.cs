using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using dailyTasks.Models;
using dailyTasks.Persistence;
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

            var dt = await context.DailyTasks.Include(x => x.Tasks).ToListAsync();

            if (filter.InitialDate != null)
                dt = dt.Where(x => x.Date.Date >= filter.InitialDate).ToList();

            if (filter.FinalDate != null)
                dt = dt.Where(x => x.Date.Date <= filter.FinalDate).ToList();

            return Ok(dt);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DailyTasks dt)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var dtDb = mapper.Map<DailyTasks, DailyTasks>(dt);

            await context.DailyTasks.AddAsync(dtDb);

            mapper.Map<DailyTasks, DailyTasks>(dtDb, dt);

            await context.SaveChangesAsync();

            return Ok(dt);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] DailyTasks dt)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var dtDb = await context.DailyTasks.Include(x=> x.Tasks).SingleOrDefaultAsync(x => x.Id == dt.Id);

            if (dtDb == null)
                return BadRequest("Task doesn't exists!");

            if (dt.Tasks.Count() == 0)
            {
                context.DailyTasks.Remove(dtDb);
                await context.SaveChangesAsync();
                dt.Id = 0;
                return Ok(dt);
            }

            mapper.Map<DailyTasks, DailyTasks>(dt, dtDb);

            await context.SaveChangesAsync();

            mapper.Map<DailyTasks, DailyTasks>(dtDb, dt);

            return Ok(dt);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var dtDb = await context.DailyTasks.Include(x => x.Tasks).SingleOrDefaultAsync(x => x.Id == id);

            if (dtDb == null)
                return NotFound("Task doesn't exists!");

            context.DailyTasks.Remove(dtDb);

            await context.SaveChangesAsync();

            return Ok();
        }


    }
}