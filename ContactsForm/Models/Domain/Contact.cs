using System.ComponentModel.DataAnnotations;

namespace ContactsForm.Models.Domain
{
    public class Contact
    {
        public Guid Id { get; set; }

        [MaxLength(80)]
        public required string Name { get; set; }

        [MaxLength(100)]
        public string? Email { get; set; }

        [MaxLength(20)]
        public required string Phone { get; set; }
        public bool Favorite { get; set; }

    }
}
