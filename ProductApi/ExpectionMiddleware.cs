using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace ProductApi
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class ExpectionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExpectionMiddleware> _logger;
        public ExpectionMiddleware(RequestDelegate next, ILogger<ExpectionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext httpContext, IHostEnvironment _env )
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception occurred: {Message}", ex.Message);
                await HandleExceptionAsync(httpContext, ex,_env);
            }

        }

        private Task HandleExceptionAsync(HttpContext context, Exception ex,IHostEnvironment _env)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var errorResponse = new ApiErrorResponse(context.Response.StatusCode, ex.Message, ex.StackTrace);
                

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            return context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse, options));
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    
}

public class ApiErrorResponse
{
    public int StatusCode { get; }
    public string Message { get; }
    public string? Details { get; }

    public ApiErrorResponse(int statusCode, string message, string? details = null)
    {
        StatusCode = statusCode;
        Message = message;
        Details = details;
    }
}
