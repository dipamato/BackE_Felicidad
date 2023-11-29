import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { RespuestasEService } from './service/respuestas-e.service';
import { RespuestasECrearDto } from './dto/respuestas-e-crear.dto';
import { PreguntaCrearDto } from 'src/pregunta/dto/pregunta.crear.dto';
import { PersonaCrearDto } from 'src/persona/dto/persona-crear.dto';
import { RecursosColCrearDto } from 'src/recursos-col/dto/recursos-col.cear.dto';

@Controller('respuestas-e')
export class RespuestasEController {
    constructor( private _respuestasEService: RespuestasEService){}

@Post('/:idEncuesta')
async crear(@Param("idEncuesta")idEncuesta:string, @Body() personaId: string){
    const resultado= await this._respuestasEService.Create(idEncuesta, personaId)
    return {ok:true, resultado}
}
@Get()
    async Listar(){
        return await this._respuestasEService.Consultar()
    }

    @Get('All')
    async ListarAll(){
        return await this._respuestasEService.ConsultarAll()
    }

@Get('/:id')
async EncontrarEncuesta(@Param("id")_id:string){
    const resultado= await this._respuestasEService.ConsultarRespuestaExId(_id)
    if(resultado==null){ throw new HttpException("no encontrado", HttpStatus.NOT_FOUND)
}
return resultado

}
@Get('People/:id')
async EncontrarEncuestaPersona(@Param("id")_id:string){
    const resultado= await this._respuestasEService.ConsultarRespuestaExIdConPersona(_id)
    if(resultado==null){ throw new HttpException("no encontrado", HttpStatus.NOT_FOUND)
}
return resultado

}
@Patch('/:id/Pregunta/:idP')
async ModificarResultadoE(@Param("id") id:string, @Param("idP") idP:string, @Body()preguntaCrearDto: PreguntaCrearDto){
    const resultado= await this._respuestasEService.UpdateRespuestasExId(id, idP, preguntaCrearDto)
    if(resultado==null){ throw new HttpException("no encontrado", HttpStatus.NOT_FOUND)
}
return{ok:true, resultado}
}

@Patch('/:id')
async ModificarTotalResultadoE(@Param("id") id:string){
    const resultado= await this._respuestasEService.UpdateTotal(id)
    if(resultado==null){ throw new HttpException("no encontrado", HttpStatus.NOT_FOUND)
}
return{ok:true, resultado}
}

@Get('IE/:nombreIE/:sede')
async FindfIE(@Param("nombreIE") nombreIE: string,@Param("sede") sede: string){ 

  try {
    const resultado=await this._respuestasEService.ConsultarRespuestaExNombreIE(nombreIE, sede)
    return{ok:true, resultado}
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw new Error('No se pudo enviar el correo electrónico');
  }
}
/// Modificar el factor de los recursos
@Patch('/:id/PreguntaRecurso/:idP')
async ModificarRecursos(@Param("id") id:string, @Param("idP") idP:string, @Body() recursosColCrearDto: RecursosColCrearDto){
    const resultado= await this._respuestasEService.UpdateRecursosColxId(id, idP, recursosColCrearDto)
    if(resultado==null){ throw new HttpException("no encontrado", HttpStatus.NOT_FOUND)
}
return{ok:true, resultado}
}
}


