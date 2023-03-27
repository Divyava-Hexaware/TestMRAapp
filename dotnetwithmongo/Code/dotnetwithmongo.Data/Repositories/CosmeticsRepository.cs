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
    public class CosmeticsRepository : ICosmeticsRepository
    {
        private readonly IGateway _gateway;
        private readonly string _collectionName = "Cosmetics";

        public CosmeticsRepository(IGateway gateway)
        {
            _gateway = gateway;
        }
        public IEnumerable<Cosmetics> GetAll()
        {
            var result = _gateway.GetMongoDB().GetCollection<Cosmetics>(_collectionName)
                            .Find(new BsonDocument())
                            .ToList();
            return result;
        }

        public Cosmetics Get(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Cosmetics>(_collectionName)
                            .Find(x => x.Id == id).Single();
            return result;
        }

        public bool Save(Cosmetics entity)
        {
            _gateway.GetMongoDB().GetCollection<Cosmetics>(_collectionName)
                .InsertOne(entity);
            return true;
        }

        public Cosmetics Update(string id, Cosmetics entity)
        {
            var update = Builders<Cosmetics>.Update
                .Set(e => e.productname, entity.productname )
                .Set(e => e.description, entity.description )
                .Set(e => e.price, entity.price )
                .Set(e => e.offer, entity.offer )
                .Set(e => e.availability, entity.availability )
                .Set(e => e.deliverydate, entity.deliverydate )
                .Set(e => e.daystodeliver, entity.daystodeliver )
                .Set(e => e.offerprice, entity.offerprice );

            var result = _gateway.GetMongoDB().GetCollection<Cosmetics>(_collectionName)
                .FindOneAndUpdate(e => e.Id == id, update);
            return result;
        }

        public bool Delete(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Cosmetics>(_collectionName)
                         .FindOneAndDelete(e => e.Id == id);
            if(result==null) return false;             
            return true;
        }
    }
}
