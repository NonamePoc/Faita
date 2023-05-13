namespace Faita.Identity.Models;

public class ChangePasswordModel
{
    /// <summary>
    ///     Пароль.
    /// </summary>
    public string Password { get; set; }
    
    public string Email { get; set; }
    
    /// <summary>
    ///     Новый пароль.
    /// </summary>
    public string NewPassword { get; set; }
}