using System;
using System.Collections.Generic;
using System.Text;
using NUnit.Framework;
using NSubstitute;
using Shouldly;
using Microsoft.AspNetCore.Mvc;
using dotnetwithmongo.BusinessEntities.Entities;
using dotnetwithmongo.Contracts.DTO;

namespace dotnetwithmongo.Test.Api.OfferControllerSpec
{
    public class When_getting_all_offer : UsingOfferControllerSpec
    {
        private ActionResult<IEnumerable<OfferDto>> _result;

        private IEnumerable<Offer> _all_offer;
        private Offer _offer;

        private IEnumerable<OfferDto>  _all_offerDto;
        private OfferDto _offerDto;
    

        public override void Context()
        {
            base.Context();

            _offer = new Offer{
                price = 15,
                offer = true
            };

            _offerDto = new OfferDto{
                    price = 77,
                    offer = true
                };

            _all_offer = new List<Offer> { _offer};
            _offerService.GetAll().Returns(_all_offer);
            _all_offerDto  = new List<OfferDto> {_offerDto};
            _mapper.Map<IEnumerable<OfferDto>>(_all_offer).Returns( _all_offerDto);
        }
        public override void Because()
        {
            _result = subject.Get();
        }

        [Test]
        public void Request_is_routed_through_service()
        {
            _offerService.Received(1).GetAll();

        }

        [Test]
        public void Appropriate_result_is_returned()
        {
            _result.Result.ShouldBeOfType<OkObjectResult>();

            var resultListObject = (_result.Result as OkObjectResult).Value;

            resultListObject.ShouldBeOfType<List<OfferDto>>();

            List<OfferDto> resultList = resultListObject as List<OfferDto>;

            resultList.Count.ShouldBe(1);

            resultList.ShouldBe(_all_offerDto);
        }
    }
}