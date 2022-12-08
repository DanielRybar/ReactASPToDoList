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
        public IActionResult Authenticate(string username, [DataType(DataType.Password)] string password)
        {
            var token = _as.Authenticate(new Models.User { UserName = username, Password = HashFunctions.ComputeMD5Hash(password) });
            var user = _context.Users.Where(x => x.UserName == username).FirstOrDefault();
            if (user == null)
            {
                _logger.LogError("Uživatel se jménem " + username + " neexistuje.");
                return NotFound();
            }
            else if (token == null && user != null)
            {
                _logger.LogError("Špatné heslo " + password + " u uživatele " + username);
                return Unauthorized();
            }
            else if (token != null)
            {
                _logger.LogInformation("Uživatel " + username + " se úspěšně přihlásil.");
                return Ok(token);
            }
            else
            {
                _logger.LogError("Neznámá chyba při přihlašování uživatele " + username);
                return BadRequest();
            }
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterIM entry)
        {
            entry.Password = HashFunctions.ComputeMD5Hash(entry.Password);
            var user = await _as.Register(entry);
            return Ok(user);
        }
    }
}
