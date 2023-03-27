using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using dotnetwithmongo.BusinessEntities.Entities;

namespace dotnetwithmongo.Test.Business.FootwearServiceSpec
{
    public class When_saving_footwear : UsingFootwearServiceSpec
    {
        private Footwear _result;

        private Footwear _footwear;

        public override void Context()
        {
            base.Context();

            _footwear = new Footwear
            {
                productname = "productname",
                description = "description",
                price = 67,
                offer = false,
                availability = 35,
                deliverydate = new DateTime(),
                daystodeliver = 85,
                offerprice = 94
            };

            _footwearRepository.Save(_footwear).Returns(true);
        }
        public override void Because()
        {
            _result = subject.Save(_footwear);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _footwearRepository.Received(1).Save(_footwear);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Footwear>();

            _result.ShouldBe(_footwear);
        }
    }
}