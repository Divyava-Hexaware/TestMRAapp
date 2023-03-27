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
    public class When_saving_footwear : UsingFootwearControllerSpec
    {
        private ActionResult<FootwearDto> _result;

        private Footwear _footwear;
        private FootwearDto _footwearDto;

        public override void Context()
        {
            base.Context();

            _footwear = new Footwear
            {
                productname = "productname",
                description = "description",
                price = 43,
                offer = false,
                availability = 89,
                deliverydate = new DateTime(),
                daystodeliver = 41,
                offerprice = 93
            };

            _footwearDto = new FootwearDto{
                    productname = "productname",
                    description = "description",
                    price = 80,
                    offer = false,
                    availability = 88,
                    deliverydate = new DateTime(),
                    daystodeliver = 19,
                    offerprice = 81
            };

            _footwearService.Save(_footwear).Returns(_footwear);
            _mapper.Map<FootwearDto>(_footwear).Returns(_footwearDto);
        }
        public override void Because()
        {
            _result = subject.Save(_footwear);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _footwearService.Received(1).Save(_footwear);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<FootwearDto>();

            var resultList = (FootwearDto)resultListObject;

            resultList.ShouldBe(_footwearDto);
        }
    }
}

