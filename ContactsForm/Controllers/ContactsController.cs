using ContactsForm.Data;
using ContactsForm.Models;
using ContactsForm.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactsForm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public ContactsController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var getAll = await dbContext.Contacts.ToListAsync();
            return Ok(getAll);
        }

        [HttpPost]
        public async Task<IActionResult> AddContact(AddContactRequestDTO request)
        {
            var domainModelContact = new Contact
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                Favorite = request.Favorite,
            };
            await dbContext.Contacts.AddAsync(domainModelContact);
            await dbContext.SaveChangesAsync();
            return Ok(domainModelContact);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> deleteContact(Guid id)
        {
            var contactDelete = await dbContext.Contacts.FindAsync(id);
            if (contactDelete is not null)
            {
                dbContext.Contacts.Remove(contactDelete);
                await dbContext.SaveChangesAsync();
            }
            return Ok();
        }

    }
}
