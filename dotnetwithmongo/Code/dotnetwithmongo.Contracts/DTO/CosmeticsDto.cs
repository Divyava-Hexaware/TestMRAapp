using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes; 
using System.Runtime.Serialization; 
namespace dotnetwithmongo.Contracts.DTO {
   public class CosmeticsDto { 
     public string Id { get; set; }
        public string productname { get; set; } 
        public string description { get; set; } 
        public int price { get; set; } 
        public bool offer { get; set; } 
        public int availability { get; set; } 
        public DateTime deliverydate { get; set; } 
        public int daystodeliver { get; set; } 
        public int offerprice { get; set; } 
} 
}
