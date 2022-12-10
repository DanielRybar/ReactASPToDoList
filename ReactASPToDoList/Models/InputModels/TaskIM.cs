namespace ReactASPToDoList.Models.InputModels
{
    public class TaskIM
    {
        public string Name { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public int UserId { get; set; }
        public DateTime Time { get; set; }
        public bool Finished { get; set; } = false;
    }
}
