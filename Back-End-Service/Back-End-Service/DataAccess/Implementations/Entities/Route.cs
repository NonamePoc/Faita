namespace Back_End_Service.DataAccess.Implementations.Entities;

public class Route : BaseEntity
{
    public string Name { get; set; }
    public ICollection<RoutePoint> RoutePoints { get; set; }
}