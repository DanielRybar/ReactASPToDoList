using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactASPToDoList.Data;
using ReactASPToDoList.Models;
using ReactASPToDoList.Models.InputModels;
using Task = ReactASPToDoList.Models.Task;

namespace ReactASPToDoList.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, [FromBody] TaskIdVM entry)
        {
            if (id != entry.Id)
            {
                return BadRequest();
            }

            var item = await _context.Tasks.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            
            _context.Entry(item).State = EntityState.Modified;

            item.Name = entry.Name;
            item.Description = entry.Description;
            item.Time = entry.Time;
            item.UserId = entry.UserId;
            item.Finished = entry.Finished;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Task>> PostTask([FromBody] TaskIM task)
        {
            if (_context.Tasks == null)
            {
                return Problem("Entity Tasks is null");
            }

            var newTask = new Task() { Name = task.Name, Description = task.Description, Finished = task.Finished, Time = task.Time, UserId = task.UserId };
            _context.Tasks.Add(newTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTask", new { id = newTask.TaskId }, task);
        }
        
        [HttpPatch("{id}")]
        public async Task<ActionResult<Task>> PatchTask(int id, JsonPatchDocument<Task> patch)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            patch.ApplyTo(task, ModelState);
            if (!TryValidateModel(task))
            {
                return ValidationProblem(ModelState);
            }

            await _context.SaveChangesAsync();
            return task;
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.TaskId == id);
        }
    }
}
