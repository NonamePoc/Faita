using Back_End_Service_Identity.Entities;

namespace Back_End_Service_Identity.Services;

public interface IEfRepository<T> where T: BaseEntity
{
    List<T> GetAll();
    T GetById(long id);
    Task<long> Add(T entity);
}