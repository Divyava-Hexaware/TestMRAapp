using dotnetwithmongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace dotnetwithmongo.BusinessServices.Interfaces
{
    public interface ICosmeticsService
    {      
        IEnumerable<Cosmetics> GetAll();
        Cosmetics Get(string id);
        Cosmetics Save(Cosmetics cosmetics);
        Cosmetics Update(string id, Cosmetics cosmetics);
        bool Delete(string id);

    }
}
