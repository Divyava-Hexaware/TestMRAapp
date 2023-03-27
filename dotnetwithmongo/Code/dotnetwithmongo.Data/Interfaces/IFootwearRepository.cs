using dotnetwithmongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace dotnetwithmongo.Data.Interfaces
{
    public interface IFootwearRepository : IGetAll<Footwear>,IGet<Footwear,string>, ISave<Footwear>, IUpdate<Footwear, string>, IDelete<string>
    {
    }
}
