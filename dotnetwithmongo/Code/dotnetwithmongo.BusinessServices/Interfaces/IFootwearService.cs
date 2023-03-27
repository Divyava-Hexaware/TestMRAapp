using dotnetwithmongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace dotnetwithmongo.BusinessServices.Interfaces
{
    public interface IFootwearService
    {      
        IEnumerable<Footwear> GetAll();
        Footwear Get(string id);
        Footwear Save(Footwear footwear);
        Footwear Update(string id, Footwear footwear);
        bool Delete(string id);

    }
}
