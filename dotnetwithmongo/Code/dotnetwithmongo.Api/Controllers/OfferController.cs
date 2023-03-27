using System.Collections.Generic;
using dotnetwithmongo.BusinessServices.Interfaces;
using dotnetwithmongo.BusinessEntities.Entities;
using dotnetwithmongo.Contracts.DTO;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace dotnetwithmongo.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OfferController : ControllerBase
    {
        readonly IOfferService _OfferService;
        private readonly IMapper _mapper;
        public OfferController(IOfferService OfferService,IMapper mapper)
        {
            _OfferService = OfferService;
            _mapper = mapper;
        }

        // GET: api/Offer
        [HttpGet]
        public ActionResult<IEnumerable<OfferDto>> Get()
        {
            var OfferDTOs = _mapper.Map<IEnumerable<OfferDto>>(_OfferService.GetAll());
            return Ok(OfferDTOs);
        }

        [HttpGet("{id}")]
        public ActionResult<OfferDto> GetById(string id)
        {
            var OfferDTO = _mapper.Map<OfferDto>(_OfferService.Get(id));
            return Ok(OfferDTO);
        }

        [HttpPost]
        public ActionResult<OfferDto> Save(Offer Offer)
        {
            var OfferDTOs = _mapper.Map<OfferDto>(_OfferService.Save(Offer));
            return Ok(OfferDTOs);
        }

        [HttpPut("{id}")]
        public ActionResult<OfferDto> Update([FromRoute] string id, Offer Offer)
        {
            var OfferDTOs = _mapper.Map<OfferDto>(_OfferService.Update(id, Offer));
            return Ok(OfferDTOs);
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete([FromRoute] string id)
        {
            bool res = _OfferService.Delete(id);
            return Ok(res);
    }


    }
}
