using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using dotnetwithmongo.BusinessEntities.Entities;

namespace dotnetwithmongo.Test.Business.CosmeticsServiceSpec
{
    public class When_getting_all_cosmetics : UsingCosmeticsServiceSpec
    {
        private IEnumerable<Cosmetics> _result;

        private IEnumerable<Cosmetics> _all_cosmetics;
        private Cosmetics _cosmetics;

        public override void Context()
        {
            base.Context();

            _cosmetics = new Cosmetics{
                productname = "productname",
                description = "description",
                price = 40,
                offer = true,
                availability = 16,
                deliverydate = new DateTime(),
                daystodeliver = 93,
                offerprice = 14
            };

            _all_cosmetics = new List<Cosmetics> { _cosmetics};
            _cosmeticsRepository.GetAll().Returns(_all_cosmetics);
        }
        public override void Because()
        {
            _result = subject.GetAll();
        }

        [Test]
        public void Request_is_routed_through_repository()
        {
            _cosmeticsRepository.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.ShouldBeOfType<List<Cosmetics>>();

            List<Cosmetics> resultList = _result as List<Cosmetics>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_cosmetics);
        }
    }
}