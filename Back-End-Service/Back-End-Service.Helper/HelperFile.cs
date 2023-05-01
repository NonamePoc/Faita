using Microsoft.AspNetCore.Http;

namespace Back_End_Service.Helper;

public class HelperFile 
{
       public static string UploadFile (IFormFile file, string folder)
        {
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), $"File\\{folder}", fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            file.CopyTo(stream);

            return fileName;
        }
}