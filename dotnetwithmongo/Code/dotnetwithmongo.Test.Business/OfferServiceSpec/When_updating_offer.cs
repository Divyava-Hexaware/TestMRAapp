using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using dotnetwithmongo.BusinessEntities.Entities;


namespace dotnetwithmongo.Test.Business.OfferServiceSpec
{
    public class When_updating_offer : UsingOfferServiceSpec
    {
        private Offer _result;
        private Offer _offer;

        public override void Context()
        {
            base.Context();

            _offer = new Offer
            {
                price = 3,
                offer = false
            };

            _offerRepository.Update(_offer.Id, _offer).Returns(_offer);
            
        }
        public override void Because()
        {
            _result = subject.Update(_offer.Id, _offer);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _offerRepository.Received(1).Update(_offer.Id, _offer);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Offer>();

            _result.ShouldBe(_offer);
        }
    }
}