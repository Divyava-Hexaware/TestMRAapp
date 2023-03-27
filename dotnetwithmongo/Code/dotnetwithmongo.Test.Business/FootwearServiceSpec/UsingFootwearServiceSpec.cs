using NSubstitute;
using dotnetwithmongo.Test.Framework;
using dotnetwithmongo.BusinessServices.Services;
using dotnetwithmongo.Data.Interfaces;

namespace dotnetwithmongo.Test.Business.FootwearServiceSpec
{
    public abstract class UsingFootwearServiceSpec : SpecFor<FootwearService>
    {
        protected IFootwearRepository _footwearRepository;

        public override void Context()
        {
            _footwearRepository = Substitute.For<IFootwearRepository>();
            subject = new FootwearService(_footwearRepository);

        }

    }
}