using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using dotnetwithmongo.BusinessEntities.Entities;


namespace dotnetwithmongo.Test.Business.CosmeticsServiceSpec
{
    public class When_updating_cosmetics : UsingCosmeticsServiceSpec
    {
        private Cosmetics _result;
        private Cosmetics _cosmetics;

        public override void Context()
        {
            base.Context();

            _cosmetics = new Cosmetics
            {
                productname = "productname",
                description = "description",
                price = 92,
                offer = true,
                availability = 92,
                deliverydate = new DateTime(),
                daystodeliver = 2,
                offerprice = 10
            };

            _cosmeticsRepository.Update(_cosmetics.Id, _cosmetics).Returns(_cosmetics);
            
        }
        public override void Because()
        {
            _result = subject.Update(_cosmetics.Id, _cosmetics);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _cosmeticsRepository.Received(1).Update(_cosmetics.Id, _cosmetics);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Cosmetics>();

            _result.ShouldBe(_cosmetics);
        }
    }
}