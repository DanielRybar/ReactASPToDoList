using System.Security.Cryptography;
using System.Text;

namespace ReactASPToDoList.Helpers
{
    public static class HashFunctions
    {
        public static string ComputeMD5Hash(string pwd)
        {
            MD5 md5 = MD5.Create();
            byte[] inputBytes = Encoding.ASCII.GetBytes(pwd);
            byte[] hash = md5.ComputeHash(inputBytes);

            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("X2"));
            }
            return sb.ToString();
        }
    }
}
