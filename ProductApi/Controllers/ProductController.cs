using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductApi.DBSYS;
using ProductApi.Model;

namespace ProductApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Get all product
        /// </summary>
        /// <returns></returns>

        [HttpGet]
        [Route("getproducts")]
        public async Task<IActionResult> GetProducts()
        {
            throw new Exception("test");
            var getpro= await _context.Products.ToListAsync();

            return Ok(getpro);
        }
         


        [HttpPost]
        [Route("Addproduct")]
        public async Task<IActionResult> addproduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }

        [HttpPut]
        [Route("Updatetproduct/id")]
        public async Task<IActionResult> updateproduct(int id, Product product)
        {
            var existing = await _context.Products.FindAsync(id);
            if (existing == null) return NotFound();
            existing.Name = product.Name;
            existing.Price = product.Price;
            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        [HttpDelete]
        [Route("Deletetproduct/id")]
        public async Task<IActionResult> Deleteproduct(int id)
        {
            var existing = await _context.Products.FindAsync(id);
            if (existing == null) return NotFound();
            _context.Products.Remove(existing);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        [Route("getallpro")]
        public async Task<IActionResult> Getallpro(int page = 1, int pageSize = 5, string? search = null)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(p => p.Name.Contains(search));
            }

            var total = await query.CountAsync();

            var products = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new { total, products });
        }
    }
}
