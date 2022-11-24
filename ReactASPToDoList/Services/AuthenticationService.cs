﻿using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using ReactASPToDoList.Data;
using ReactASPToDoList.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AuthenticationToken = ReactASPToDoList.Models.AuthenticationToken;

namespace ReactASPToDoList.Services
{
    public sealed class AuthenticationService
    {
        internal readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthenticationService(AppDbContext context, IConfiguration configuration)
        {
            _context = context; ;
            _configuration = configuration;
        }

        public AuthenticationToken? Authenticate(User user)
        {
            var u = _context.Users.FirstOrDefault(x => x.UserName == user.UserName && x.Password == user.Password);
            if (u == null)
            {
                return null;
            }
            return CreateAuthenticationToken(u);
        }

        private AuthenticationToken CreateAuthenticationToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(_configuration["JWT:Key"]);
            int.TryParse(_configuration["JWT:Expiration"], out int validityDuration);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new(ClaimTypes.Name, user.UserName),
                    new("sub", user.UserId.ToString())
                }),
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"],
                Expires = DateTime.UtcNow.AddMinutes(validityDuration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new AuthenticationToken()
            {
                Token = tokenHandler.WriteToken(token),
            };
        }
    }
}