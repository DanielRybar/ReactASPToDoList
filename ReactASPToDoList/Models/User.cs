using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ReactASPToDoList.Models
{
    public class User
    {
        public int UserId { get; set; }
        [Required]
        public string UserName { get; set; } = String.Empty;
        [Required]
        public string Password { get; set; } = String.Empty;
        [JsonIgnore]
        public ICollection<Task> Tasks { get; set; }
    }
}