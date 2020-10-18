using Api.Models;

namespace Api.Tools
{
    public class AuthTools
    {
        public static bool  admin(UserAdmin creds){
            return true;
        }

        public static bool user(UserUser creds){
            return true;
        }
        
    }
}