using NSubstitute;
using dotnetwithmongo.Test.Framework;
using dotnetwithmongo.Api.Controllers;
using dotnetwithmongo.BusinessServices.Interfaces;
using AutoMapper;
using dotnetwithmongo.BusinessEntities.Entities;
using dotnetwithmongo.Contracts.DTO;


namespace dotnetwithmongo.Test.Api.OfferControllerSpec
{
    public abstract class UsingOfferControllerSpec : SpecFor<OfferController>
    {
        protected IOfferService _offerService;
        protected IMapper _mapper;

        public override void Context()
        {
            _offerService = Substitute.For<IOfferService>();
            _mapper = Substitute.For<IMapper>();
            subject = new OfferController(_offerService,_mapper);

        }

    }
}
