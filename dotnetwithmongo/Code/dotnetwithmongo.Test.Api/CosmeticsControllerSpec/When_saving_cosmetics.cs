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
    public class When_saving_cosmetics : UsingCosmeticsControllerSpec
    {
        private ActionResult<CosmeticsDto> _result;

        private Cosmetics _cosmetics;
        private CosmeticsDto _cosmeticsDto;

        public override void Context()
        {
            base.Context();

            _cosmetics = new Cosmetics
            {
                productname = "productname",
                description = "description",
                price = 68,
                offer = true,
                availability = 75,
                deliverydate = new DateTime(),
                daystodeliver = 2,
                offerprice = 5
            };

            _cosmeticsDto = new CosmeticsDto{
                    productname = "productname",
                    description = "description",
                    price = 16,
                    offer = true,
                    availability = 78,
                    deliverydate = new DateTime(),
                    daystodeliver = 75,
                    offerprice = 94
            };

            _cosmeticsService.Save(_cosmetics).Returns(_cosmetics);
            _mapper.Map<CosmeticsDto>(_cosmetics).Returns(_cosmeticsDto);
        }
        public override void Because()
        {
            _result = subject.Save(_cosmetics);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _cosmeticsService.Received(1).Save(_cosmetics);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<CosmeticsDto>();

            var resultList = (CosmeticsDto)resultListObject;

            resultList.ShouldBe(_cosmeticsDto);
        }
    }
}

