using System.ComponentModel.DataAnnotations;

namespace ReactASPToDoList.Models
{
    public class Task
    {
        public int TaskId { get; set; }
        [Required]
        public string Name { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public User User { get; set; }
        public int UserId { get; set; }
        public DateTime Time { get; set; }
        public bool Finished { get; set; } = false;
    }
}
