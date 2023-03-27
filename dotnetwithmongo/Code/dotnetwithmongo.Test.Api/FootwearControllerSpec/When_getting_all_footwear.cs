using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using dotnetwithmongo.BusinessEntities.Entities;
using dotnetwithmongo.Contracts.DTO;

namespace dotnetwithmongo.Test.Api.FootwearControllerSpec
{
    public class When_getting_all_footwear : UsingFootwearControllerSpec
    {
        private ActionResult<IEnumerable<FootwearDto>> _result;

        private IEnumerable<Footwear> _all_footwear;
        private Footwear _footwear;

        private IEnumerable<FootwearDto>  _all_footwearDto;
        private FootwearDto _footwearDto;
    

        public override void Context()
        {
            base.Context();

            _footwear = new Footwear{
                productname = "productname",
                description = "description",
                price = 3,
                offer = false,
                availability = 31,
                deliverydate = new DateTime(),
                daystodeliver = 42,
                offerprice = 60
            };

            _footwearDto = new FootwearDto{
                    productname = "productname",
                    description = "description",
                    price = 66,
                    offer = true,
                    availability = 13,
                    deliverydate = new DateTime(),
                    daystodeliver = 46,
                    offerprice = 48
                };

            _all_footwear = new List<Footwear> { _footwear};
            _footwearService.GetAll().Returns(_all_footwear);
            _all_footwearDto  = new List<FootwearDto> {_footwearDto};
            _mapper.Map<IEnumerable<FootwearDto>>(_all_footwear).Returns( _all_footwearDto);
        }
        public override void Because()
        {
            _result = subject.Get();
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _footwearService.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<List<FootwearDto>>();

            List<FootwearDto> resultList = resultListObject as List<FootwearDto>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_footwearDto);
        }
    }
}