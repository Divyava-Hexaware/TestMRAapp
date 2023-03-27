namespace dotnetwithmongo.Data.Interfaces
{
    public interface IUpdate<T, in U> where T : class
    {
        T Update(U id, T entity);
    }
}
