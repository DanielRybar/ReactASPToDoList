namespace ReactASPToDoList.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;
        public ICollection<Task> Tasks { get; set; }
    }
}