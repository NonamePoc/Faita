namespace Back_End_Service.DataAccess.Implementations.Entities;

public class TripOrderRequest : BaseEntity
{
    public TripOrder TripOrder { get; set; }
    public Person Person { get; set; }
    public int PlacesQty { get; set; }
}