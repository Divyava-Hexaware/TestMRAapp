using dotnetwithmongo.Data.Interfaces;
using dotnetwithmongo.BusinessEntities.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Bindings;
using System;
using System.Collections.Generic;
using System.Text;

namespace dotnetwithmongo.Data.Repositories
{
    public class OfferRepository : IOfferRepository
    {
        private readonly IGateway _gateway;
        private readonly string _collectionName = "Offer";

        public OfferRepository(IGateway gateway)
        {
            _gateway = gateway;
        }
        public IEnumerable<Offer> GetAll()
        {
            var result = _gateway.GetMongoDB().GetCollection<Offer>(_collectionName)
                            .Find(new BsonDocument())
                            .ToList();
            return result;
        }

        public Offer Get(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Offer>(_collectionName)
                            .Find(x => x.Id == id).Single();
            return result;
        }

        public bool Save(Offer entity)
        {
            _gateway.GetMongoDB().GetCollection<Offer>(_collectionName)
                .InsertOne(entity);
            return true;
        }

        public Offer Update(string id, Offer entity)
        {
            var update = Builders<Offer>.Update
                .Set(e => e.price, entity.price )
                .Set(e => e.offer, entity.offer );

            var result = _gateway.GetMongoDB().GetCollection<Offer>(_collectionName)
                .FindOneAndUpdate(e => e.Id == id, update);
            return result;
        }

        public bool Delete(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Offer>(_collectionName)
                         .FindOneAndDelete(e => e.Id == id);
            if(result==null) return false;             
            return true;
        }
    }
}
