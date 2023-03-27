using dotnetwithmongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace dotnetwithmongo.Data.Interfaces
{
    public interface ICosmeticsRepository : IGetAll<Cosmetics>,IGet<Cosmetics,string>, ISave<Cosmetics>, IUpdate<Cosmetics, string>, IDelete<string>
    {
    }
}
