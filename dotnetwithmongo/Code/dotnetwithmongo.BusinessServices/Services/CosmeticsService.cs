using dotnetwithmongo.BusinessServices.Interfaces;
using dotnetwithmongo.Data.Interfaces;
using dotnetwithmongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace dotnetwithmongo.BusinessServices.Services
{
    public class CosmeticsService : ICosmeticsService
    {
        readonly ICosmeticsRepository _CosmeticsRepository;

        public CosmeticsService(ICosmeticsRepository CosmeticsRepository)
        {
           this._CosmeticsRepository = CosmeticsRepository;
        }
        public IEnumerable<Cosmetics> GetAll()
        {
            return _CosmeticsRepository.GetAll();
        }

        public Cosmetics Get(string id)
        {
            return _CosmeticsRepository.Get(id);
        }

        public Cosmetics Save(Cosmetics cosmetics)
        {
            _CosmeticsRepository.Save(cosmetics);
            return cosmetics;
        }

        public Cosmetics Update(string id, Cosmetics cosmetics)
        {
            return _CosmeticsRepository.Update(id, cosmetics);
        }

        public bool Delete(string id)
        {
            return _CosmeticsRepository.Delete(id);
        }

    }
}
