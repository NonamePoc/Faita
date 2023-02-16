using Back_End_Service.DataAccess.Contracts;

namespace Back_End_Service.DataAccess.Implementations.Entities;


public class BaseEntity: IEntity
{
    public Guid Id { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreationDate { get; set; }
}