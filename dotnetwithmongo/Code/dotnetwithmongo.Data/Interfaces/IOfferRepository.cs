using dotnetwithmongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace dotnetwithmongo.Data.Interfaces
{
    public interface IOfferRepository : IGetAll<Offer>,IGet<Offer,string>, ISave<Offer>, IUpdate<Offer, string>, IDelete<string>
    {
    }
}
