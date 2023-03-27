using dotnetwithmongo.BusinessEntities.Entities;
using dotnetwithmongo.Contracts.DTO;
using AutoMapper;
namespace dotnetwithmongo.Api.Middleware
{
public class MappingFile : Profile
{
    public MappingFile()
    {
        // Mapping variables
		CreateMap<Footwear , FootwearDto>(); 
		CreateMap<Cosmetics , CosmeticsDto>(); 
    }
  }
}
