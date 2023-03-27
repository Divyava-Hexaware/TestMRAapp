using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using dotnetwithmongo.BusinessEntities.Entities;

namespace dotnetwithmongo.Test.Business.FootwearServiceSpec
{
    public class When_getting_all_footwear : UsingFootwearServiceSpec
    {
        private IEnumerable<Footwear> _result;

        private IEnumerable<Footwear> _all_footwear;
        private Footwear _footwear;

        public override void Context()
        {
            base.Context();

            _footwear = new Footwear{
                productname = "productname",
                description = "description",
                price = 92,
                offer = true,
                availability = 75,
                deliverydate = new DateTime(),
                daystodeliver = 85,
                offerprice = 39
            };

            _all_footwear = new List<Footwear> { _footwear};
            _footwearRepository.GetAll().Returns(_all_footwear);
        }
        public override void Because()
        {
            _result = subject.GetAll();
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _footwearRepository.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<List<Footwear>>();

            List<Footwear> resultList = _result as List<Footwear>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_footwear);
        }
    }
}