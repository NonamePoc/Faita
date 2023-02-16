namespace Back_End_Service.DataAccess.Implementations.Entities;

public class Boat: BaseEntity
{
    public Skipper Skipper { get; set; }
    public int CabinQty { get; set; }
}