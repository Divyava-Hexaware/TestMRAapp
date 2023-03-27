using dotnetwithmongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace dotnetwithmongo.BusinessServices.Interfaces
{
    public interface IOfferService
    {      
        IEnumerable<Offer> GetAll();
        Offer Get(string id);
        Offer Save(Offer offer);
        Offer Update(string id, Offer offer);
        bool Delete(string id);

    }
}
