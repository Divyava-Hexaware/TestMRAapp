using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using dotnetwithmongo.BusinessEntities.Entities;


namespace dotnetwithmongo.Test.Business.FootwearServiceSpec
{
    public class When_updating_footwear : UsingFootwearServiceSpec
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
                price = 95,
                offer = true,
                availability = 100,
                deliverydate = new DateTime(),
                daystodeliver = 100,
                offerprice = 47
            };

            _footwearRepository.Update(_footwear.Id, _footwear).Returns(_footwear);
            
        }
        public override void Because()
        {
            _result = subject.Update(_footwear.Id, _footwear);
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _footwearRepository.Received(1).Update(_footwear.Id, _footwear);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<Footwear>();

            _result.ShouldBe(_footwear);
        }
    }
}