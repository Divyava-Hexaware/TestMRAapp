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
    public class FootwearRepository : IFootwearRepository
    {
        private readonly IGateway _gateway;
        private readonly string _collectionName = "Footwear";

        public FootwearRepository(IGateway gateway)
        {
            _gateway = gateway;
        }
        public IEnumerable<Footwear> GetAll()
        {
            var result = _gateway.GetMongoDB().GetCollection<Footwear>(_collectionName)
                            .Find(new BsonDocument())
                            .ToList();
            return result;
        }

        public Footwear Get(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Footwear>(_collectionName)
                            .Find(x => x.Id == id).Single();
            return result;
        }

        public bool Save(Footwear entity)
        {
            _gateway.GetMongoDB().GetCollection<Footwear>(_collectionName)
                .InsertOne(entity);
            return true;
        }

        public Footwear Update(string id, Footwear entity)
        {
            var update = Builders<Footwear>.Update
                .Set(e => e.productname, entity.productname )
                .Set(e => e.description, entity.description )
                .Set(e => e.price, entity.price )
                .Set(e => e.offer, entity.offer )
                .Set(e => e.availability, entity.availability )
                .Set(e => e.deliverydate, entity.deliverydate )
                .Set(e => e.daystodeliver, entity.daystodeliver )
                .Set(e => e.offerprice, entity.offerprice );

            var result = _gateway.GetMongoDB().GetCollection<Footwear>(_collectionName)
                .FindOneAndUpdate(e => e.Id == id, update);
            return result;
        }

        public bool Delete(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Footwear>(_collectionName)
                         .FindOneAndDelete(e => e.Id == id);
            if(result==null) return false;             
            return true;
        }
    }
}
