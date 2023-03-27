using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes; 
using System.Runtime.Serialization; 
namespace dotnetwithmongo.Contracts.DTO {
   public class OfferDto { 
     public string Id { get; set; }
        public int price { get; set; } 
        public bool offer { get; set; } 
} 
}
