using NSubstitute;
using dotnetwithmongo.Test.Framework;
using dotnetwithmongo.BusinessServices.Services;
using dotnetwithmongo.Data.Interfaces;

namespace dotnetwithmongo.Test.Business.CosmeticsServiceSpec
{
    public abstract class UsingCosmeticsServiceSpec : SpecFor<CosmeticsService>
    {
        protected ICosmeticsRepository _cosmeticsRepository;

        public override void Context()
        {
            _cosmeticsRepository = Substitute.For<ICosmeticsRepository>();
            subject = new CosmeticsService(_cosmeticsRepository);

        }

    }
}