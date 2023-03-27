using NSubstitute;
using dotnetwithmongo.Test.Framework;
using dotnetwithmongo.BusinessServices.Services;
using dotnetwithmongo.Data.Interfaces;

namespace dotnetwithmongo.Test.Business.OfferServiceSpec
{
    public abstract class UsingOfferServiceSpec : SpecFor<OfferService>
    {
        protected IOfferRepository _offerRepository;

        public override void Context()
        {
            _offerRepository = Substitute.For<IOfferRepository>();
            subject = new OfferService(_offerRepository);

        }

    }
}