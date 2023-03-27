using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using dotnetwithmongo.BusinessEntities.Entities;

namespace dotnetwithmongo.Test.Business.CosmeticsServiceSpec
{
    public class When_saving_cosmetics : UsingCosmeticsServiceSpec
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
                price = 62,
                offer = false,
                availability = 77,
                deliverydate = new DateTime(),
                daystodeliver = 72,
                offerprice = 65
            };

            _cosmeticsRepository.Save(_cosmetics).Returns(true);
        }
        public override void Because()
        {
            _result = subject.Save(_cosmetics);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _cosmeticsRepository.Received(1).Save(_cosmetics);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Cosmetics>();

            _result.ShouldBe(_cosmetics);
        }
    }
}