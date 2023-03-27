using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using dotnetwithmongo.BusinessEntities.Entities;
using dotnetwithmongo.Contracts.DTO;

namespace dotnetwithmongo.Test.Api.CosmeticsControllerSpec
{
    public class When_getting_all_cosmetics : UsingCosmeticsControllerSpec
    {
        private ActionResult<IEnumerable<CosmeticsDto>> _result;

        private IEnumerable<Cosmetics> _all_cosmetics;
        private Cosmetics _cosmetics;

        private IEnumerable<CosmeticsDto>  _all_cosmeticsDto;
        private CosmeticsDto _cosmeticsDto;
    

        public override void Context()
        {
            base.Context();

            _cosmetics = new Cosmetics{
                productname = "productname",
                description = "description",
                price = 40,
                offer = false,
                availability = 20,
                deliverydate = new DateTime(),
                daystodeliver = 76,
                offerprice = 20
            };

            _cosmeticsDto = new CosmeticsDto{
                    productname = "productname",
                    description = "description",
                    price = 2,
                    offer = false,
                    availability = 43,
                    deliverydate = new DateTime(),
                    daystodeliver = 24,
                    offerprice = 41
                };

            _all_cosmetics = new List<Cosmetics> { _cosmetics};
            _cosmeticsService.GetAll().Returns(_all_cosmetics);
            _all_cosmeticsDto  = new List<CosmeticsDto> {_cosmeticsDto};
            _mapper.Map<IEnumerable<CosmeticsDto>>(_all_cosmetics).Returns( _all_cosmeticsDto);
        }
        public override void Because()
        {
            _result = subject.Get();
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _cosmeticsService.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<List<CosmeticsDto>>();

            List<CosmeticsDto> resultList = resultListObject as List<CosmeticsDto>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_cosmeticsDto);
        }
    }
}