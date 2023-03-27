using NSubstitute;
using dotnetwithmongo.Test.Framework;
using dotnetwithmongo.Api.Controllers;
using dotnetwithmongo.BusinessServices.Interfaces;
using AutoMapper;
using dotnetwithmongo.BusinessEntities.Entities;
using dotnetwithmongo.Contracts.DTO;


namespace dotnetwithmongo.Test.Api.FootwearControllerSpec
{
    public abstract class UsingFootwearControllerSpec : SpecFor<FootwearController>
    {
        protected IFootwearService _footwearService;
        protected IMapper _mapper;

        public override void Context()
        {
            _footwearService = Substitute.For<IFootwearService>();
            _mapper = Substitute.For<IMapper>();
            subject = new FootwearController(_footwearService,_mapper);

        }

    }
}
