using System.Net;
using Newtonsoft.Json;

namespace Back_End_Service.Middlware
{
    public sealed class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly JsonSerializerSettings _serializerSettings;

        public GlobalExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
            _serializerSettings = new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore
            };
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            

            var jsonResponseContainer = new 
            {
                Errors = new[]
                {
                    new 
                    {
                        Title = HttpStatusCode.BadRequest.ToString("G"),
                        Detail = exception.Message
                    }
                }
            };

            var json = JsonConvert.SerializeObject(jsonResponseContainer, _serializerSettings);
            return context.Response.WriteAsync(json);
        }
    }
}