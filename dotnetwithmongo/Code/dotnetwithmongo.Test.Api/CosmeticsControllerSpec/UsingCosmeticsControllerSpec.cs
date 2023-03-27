using NSubstitute;
using dotnetwithmongo.Test.Framework;
using dotnetwithmongo.Api.Controllers;
using dotnetwithmongo.BusinessServices.Interfaces;
using AutoMapper;
using dotnetwithmongo.BusinessEntities.Entities;
using dotnetwithmongo.Contracts.DTO;


namespace dotnetwithmongo.Test.Api.CosmeticsControllerSpec
{
    public abstract class UsingCosmeticsControllerSpec : SpecFor<CosmeticsController>
    {
        protected ICosmeticsService _cosmeticsService;
        protected IMapper _mapper;

        public override void Context()
        {
            _cosmeticsService = Substitute.For<ICosmeticsService>();
            _mapper = Substitute.For<IMapper>();
            subject = new CosmeticsController(_cosmeticsService,_mapper);

        }

    }
}
