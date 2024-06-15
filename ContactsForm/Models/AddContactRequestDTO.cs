using System.ComponentModel.DataAnnotations;

namespace ContactsForm.Models
{
    public class AddContactRequestDTO
    {
        [MaxLength(80)]
        public required string Name { get; set; }

        [MaxLength(100)]
        public string? Email { get; set; }

        [MaxLength(20)]
        public required string Phone { get; set; }
        public bool Favorite { get; set; }
    }
}
