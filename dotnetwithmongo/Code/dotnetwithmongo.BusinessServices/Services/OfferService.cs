using dotnetwithmongo.BusinessServices.Interfaces;
using dotnetwithmongo.Data.Interfaces;
using dotnetwithmongo.BusinessEntities.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace dotnetwithmongo.BusinessServices.Services
{
    public class OfferService : IOfferService
    {
        readonly IOfferRepository _OfferRepository;

        public OfferService(IOfferRepository OfferRepository)
        {
           this._OfferRepository = OfferRepository;
        }
        public IEnumerable<Offer> GetAll()
        {
            return _OfferRepository.GetAll();
        }

        public Offer Get(string id)
        {
            return _OfferRepository.Get(id);
        }

        public Offer Save(Offer offer)
        {
            _OfferRepository.Save(offer);
            return offer;
        }

        public Offer Update(string id, Offer offer)
        {
            return _OfferRepository.Update(id, offer);
        }

        public bool Delete(string id)
        {
            return _OfferRepository.Delete(id);
        }

    }
}
