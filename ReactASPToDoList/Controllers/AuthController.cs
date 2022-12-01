using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactASPToDoList.Models.InputModels;
using ReactASPToDoList.Services;

namespace ReactASPToDoList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private AuthenticationService _as;
        private ILogger<AuthController> _logger;

        public AuthController(AuthenticationService @as, ILogger<AuthController> logger)
        {
            _as = @as;
            _logger = logger;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(string username, string password)
        {
            var token = _as.Authenticate(new Models.User { UserName = username, Password = password });
            if (token == null)
            {
                return Unauthorized();
            }
            return Ok(token);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterIM entry)
        {
            var user = await _as.Register(entry);
            return Ok(user);
        }
    }
}
