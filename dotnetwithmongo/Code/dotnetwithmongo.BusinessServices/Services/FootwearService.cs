using dotnetwithmongo.BusinessServices.Interfaces;
using dotnetwithmongo.Data.Interfaces;
using dotnetwithmongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace dotnetwithmongo.BusinessServices.Services
{
    public class FootwearService : IFootwearService
    {
        readonly IFootwearRepository _FootwearRepository;

        public FootwearService(IFootwearRepository FootwearRepository)
        {
           this._FootwearRepository = FootwearRepository;
        }
        public IEnumerable<Footwear> GetAll()
        {
            return _FootwearRepository.GetAll();
        }

        public Footwear Get(string id)
        {
            return _FootwearRepository.Get(id);
        }

        public Footwear Save(Footwear footwear)
        {
            _FootwearRepository.Save(footwear);
            return footwear;
        }

        public Footwear Update(string id, Footwear footwear)
        {
            return _FootwearRepository.Update(id, footwear);
        }

        public bool Delete(string id)
        {
            return _FootwearRepository.Delete(id);
        }

    }
}
