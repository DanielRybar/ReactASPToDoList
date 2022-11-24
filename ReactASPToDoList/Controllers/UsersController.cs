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

namespace ReactASPToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromBody] UserIM user)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'AppDbContext.User'  is null.");
            }
            
            User newUser = new User { UserName = user.UserName, Password = user.Password };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = newUser.UserId }, user);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<User>> PatchUser(int id, [FromBody] JsonPatchDocument<User> patch)
        {
            if (patch == null)
            {
                return BadRequest();
            }
            if (_context.Users == null)
            {
                return Problem("Entity set 'AppDbContext.User'  is null.");
            }
            
            User user = _context.Users.SingleOrDefault(b => b.UserId == id);
            if (user != null)
            {
                patch.ApplyTo(user, ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                foreach (var op in patch.Operations)
                {
                    if (op.path.ToLower() == "/userid")
                    {
                        return BadRequest();
                    }
                }

                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(user);
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }

    public class UserIM
    {
        public string UserName { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;
    }
}