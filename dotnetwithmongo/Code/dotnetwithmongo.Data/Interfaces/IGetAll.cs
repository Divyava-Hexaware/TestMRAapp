using System.Collections.Generic;

namespace dotnetwithmongo.Data.Interfaces
{
    public interface IGetAll<out T> where T : class
    {
        IEnumerable<T> GetAll();
    }
}
