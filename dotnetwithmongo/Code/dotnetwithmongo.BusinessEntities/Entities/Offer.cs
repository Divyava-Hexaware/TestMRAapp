using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace dotnetwithmongo.BusinessEntities.Entities
{
    [BsonIgnoreExtraElements]
    public class Offer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id  { get; set; }
        public int price  { get; set; }
        public bool offer  { get; set; }
        
    }

}
