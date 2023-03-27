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

namespace dotnetwithmongo.Test.Api.FootwearControllerSpec
{
    public class When_updating_footwear : UsingFootwearControllerSpec
    {
        private ActionResult<FootwearDto > _result;
        private Footwear _footwear;
        private FootwearDto _footwearDto;

        public override void Context()
        {
            base.Context();

            _footwear = new Footwear
            {
                productname = "productname",
                description = "description",
                price = 70,
                offer = false,
                availability = 1,
                deliverydate = new DateTime(),
                daystodeliver = 97,
                offerprice = 1
            };

            _footwearDto = new FootwearDto{
                    productname = "productname",
                    description = "description",
                    price = 45,
                    offer = true,
                    availability = 2,
                    deliverydate = new DateTime(),
                    daystodeliver = 21,
                    offerprice = 89
            };

            _footwearService.Update(_footwear.Id, _footwear).Returns(_footwear);
            _mapper.Map<FootwearDto>(_footwear).Returns(_footwearDto);
            
        }
        public override void Because()
        {
            _result = subject.Update(_footwear.Id, _footwear);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _footwearService.Received(1).Update(_footwear.Id, _footwear);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<FootwearDto>();

            var resultList = resultListObject as FootwearDto;

            resultList.ShouldBe(_footwearDto);
        }
    }
}