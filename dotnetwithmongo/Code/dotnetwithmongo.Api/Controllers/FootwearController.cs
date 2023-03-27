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
    public class FootwearController : ControllerBase
    {
        readonly IFootwearService _FootwearService;
        private readonly IMapper _mapper;
        public FootwearController(IFootwearService FootwearService,IMapper mapper)
        {
            _FootwearService = FootwearService;
            _mapper = mapper;
        }

        // GET: api/Footwear
        [HttpGet]
        public ActionResult<IEnumerable<FootwearDto>> Get()
        {
            var FootwearDTOs = _mapper.Map<IEnumerable<FootwearDto>>(_FootwearService.GetAll());
            return Ok(FootwearDTOs);
        }

        [HttpGet("{id}")]
        public ActionResult<FootwearDto> GetById(string id)
        {
            var FootwearDTO = _mapper.Map<FootwearDto>(_FootwearService.Get(id));
            return Ok(FootwearDTO);
        }

        [HttpPost]
        public ActionResult<FootwearDto> Save(Footwear Footwear)
        {
            var FootwearDTOs = _mapper.Map<FootwearDto>(_FootwearService.Save(Footwear));
            return Ok(FootwearDTOs);
        }

        [HttpPut("{id}")]
        public ActionResult<FootwearDto> Update([FromRoute] string id, Footwear Footwear)
        {
            var FootwearDTOs = _mapper.Map<FootwearDto>(_FootwearService.Update(id, Footwear));
            return Ok(FootwearDTOs);
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete([FromRoute] string id)
        {
            bool res = _FootwearService.Delete(id);
            return Ok(res);
    }


    }
}
