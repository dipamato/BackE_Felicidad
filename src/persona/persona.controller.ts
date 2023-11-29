import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PersonaService } from './service/persona.service';
import { PersonaCrearDto } from './dto/persona-crear.dto';

@Controller('persona')
export class PersonaController {
  constructor(private _personaService: PersonaService) {}

  @Post()
  async crear(@Body() personaCrearDto: PersonaCrearDto) {
    const resultado = await this._personaService.Create(personaCrearDto);
    return { ok: true, resultado };
  }

  @Get('')
  async EncontrarPersonas() {
    const resultado = await this._personaService.Consultar();
    console.log(resultado);
    if (resultado == null) {
      throw new HttpException('no encontrado', HttpStatus.NOT_FOUND);
    }
    return resultado;
  }
  @Get('/:id')
  async EncontrarPersona(@Param('id') id: string) {
    console.log(id);
    const resultado = await this._personaService.ConsultarxId(id);
    console.log(resultado);
    if (resultado == null) {
      throw new HttpException('no encontrado', HttpStatus.NOT_FOUND);
    }
    return resultado;
  }

  @Patch('/:id')
  async ModificarPersona(
    @Param('id') id: string,
    @Body() persona: PersonaCrearDto,
  ) {
    const resultado = await this._personaService.Modificar(id, persona);
    if (resultado == null) {
      throw new HttpException('no encontrado', HttpStatus.NOT_FOUND);
    }
    return resultado;
  }
}
