namespace Back_End_Service.Identity.Models;

public class ChangeEmailModel
{
    /// <summary>
    ///     Почта.
    /// </summary>


    public string Email { get; set; }

    /// <summary>
    ///     Новая почта.
    /// </summary>
    public string NewEmail { get; set; }

    /// <summary>
    ///     Токен для смены почты
    /// </summary>
    public string Token { get; set; }
}