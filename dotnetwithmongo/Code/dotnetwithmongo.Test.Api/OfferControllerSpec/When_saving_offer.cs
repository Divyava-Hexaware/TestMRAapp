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

namespace dotnetwithmongo.Test.Api.OfferControllerSpec
{
    public class When_saving_offer : UsingOfferControllerSpec
    {
        private ActionResult<OfferDto> _result;

        private Offer _offer;
        private OfferDto _offerDto;

        public override void Context()
        {
            base.Context();

            _offer = new Offer
            {
                price = 61,
                offer = false
            };

            _offerDto = new OfferDto{
                    price = 66,
                    offer = true
            };

            _offerService.Save(_offer).Returns(_offer);
            _mapper.Map<OfferDto>(_offer).Returns(_offerDto);
        }
        public override void Because()
        {
            _result = subject.Save(_offer);
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _offerService.Received(1).Save(_offer);

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<OfferDto>();

            var resultList = (OfferDto)resultListObject;

            resultList.ShouldBe(_offerDto);
        }
    }
}

