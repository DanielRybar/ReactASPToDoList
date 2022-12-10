namespace ReactASPToDoList.Models.InputModels
{
    public class TaskIdVM
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public int UserId { get; set; }
        public DateTime Time { get; set; }
        public bool Finished { get; set; } = false;
    }

    public class UserIdVM
    {
        public int Id { get; set; }
        public string UserName { get; set; } = String.Empty;
        public string Password { get; set; } = String.Empty;
    }
}
