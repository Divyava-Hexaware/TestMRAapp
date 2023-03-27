using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using dotnetwithmongo.BusinessEntities.Entities;

namespace dotnetwithmongo.Test.Business.OfferServiceSpec
{
    public class When_getting_all_offer : UsingOfferServiceSpec
    {
        private IEnumerable<Offer> _result;

        private IEnumerable<Offer> _all_offer;
        private Offer _offer;

        public override void Context()
        {
            base.Context();

            _offer = new Offer{
                price = 76,
                offer = true
            };

            _all_offer = new List<Offer> { _offer};
            _offerRepository.GetAll().Returns(_all_offer);
        }
        public override void Because()
        {
            _result = subject.GetAll();
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _offerRepository.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<List<Offer>>();

            List<Offer> resultList = _result as List<Offer>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_offer);
        }
    }
}