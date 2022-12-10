using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactASPToDoList.Data;
using ReactASPToDoList.Helpers;
using ReactASPToDoList.Models.InputModels;
using ReactASPToDoList.Services;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ReactASPToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private AuthenticationService _as;
        private ILogger<AuthController> _logger;
        private AppDbContext _context;

        public AuthController(AuthenticationService @as, ILogger<AuthController> logger, AppDbContext context)
        {
            _as = @as;
            _logger = logger;
            _context = context;
        }
        
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate(UserIM entry)
        {
            if (entry == null) 
                return BadRequest("No data provided");
            var token = _as.Authenticate(new Models.User { UserName = entry.UserName, Password = HashFunctions.ComputeMD5Hash(entry.Password) });
            var user = _context.Users.Where(x => x.UserName == entry.UserName).FirstOrDefault();
            if (user == null)
            {
                _logger.LogError("Uživatel se jménem " + entry.UserName + " neexistuje.");
                return NotFound("Uživatel se jménem " + entry.UserName + " neexistuje.");
            }
            else if (token == null && user != null)
            {
                _logger.LogError("Špatné heslo " + entry.Password + " u uživatele " + entry.UserName);
                return Unauthorized("Špatné heslo " + entry.Password + " u uživatele " + entry.UserName);
            }
            else if (token != null)
            {
                _logger.LogInformation("Uživatel " + entry.UserName + " se úspěšně přihlásil.");
                return Ok(token);
            }
            else
            {
                _logger.LogError("Neznámá chyba při přihlašování uživatele " + entry.UserName);
                return BadRequest("Neznámá chyba při přihlašování uživatele " + entry.UserName);
            }
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserIM entry)
        {
            if (entry == null)
                return BadRequest("No data provided");
            entry.Password = HashFunctions.ComputeMD5Hash(entry.Password);
            var user = await _as.Register(entry);
            return Ok(user);
        }
    }
}
