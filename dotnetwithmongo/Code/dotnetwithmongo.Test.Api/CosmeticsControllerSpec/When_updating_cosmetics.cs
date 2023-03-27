using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using dotnetwithmongo.BusinessEntities.Entities;
using dotnetwithmongo.Contracts.DTO;
using dotnetwithmongo.BusinessServices.Services;

namespace dotnetwithmongo.Test.Api.CosmeticsControllerSpec
{
    public class When_updating_cosmetics : UsingCosmeticsControllerSpec
    {
        private ActionResult<CosmeticsDto > _result;
        private Cosmetics _cosmetics;
        private CosmeticsDto _cosmeticsDto;

        public override void Context()
        {
            base.Context();

            _cosmetics = new Cosmetics
            {
                productname = "productname",
                description = "description",
                price = 48,
                offer = false,
                availability = 68,
                deliverydate = new DateTime(),
                daystodeliver = 96,
                offerprice = 35
            };

            _cosmeticsDto = new CosmeticsDto{
                    productname = "productname",
                    description = "description",
                    price = 91,
                    offer = false,
                    availability = 46,
                    deliverydate = new DateTime(),
                    daystodeliver = 88,
                    offerprice = 12
            };

            _cosmeticsService.Update(_cosmetics.Id, _cosmetics).Returns(_cosmetics);
            _mapper.Map<CosmeticsDto>(_cosmetics).Returns(_cosmeticsDto);
            
        }
        public override void Because()
        {
            _result = subject.Update(_cosmetics.Id, _cosmetics);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _cosmeticsService.Received(1).Update(_cosmetics.Id, _cosmetics);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<CosmeticsDto>();

            var resultList = resultListObject as CosmeticsDto;

            resultList.ShouldBe(_cosmeticsDto);
        }
    }
}