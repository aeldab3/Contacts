
using ContactsForm.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ContactsForm.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

       public DbSet<Contact> Contacts { get; set; }
    }
}
