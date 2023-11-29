import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { EncuestaService } from './service/encuesta.service';
import { EncuestaCrearDto } from './dto/encuesta-crear.dto';
import { PreguntaCrearDto } from 'src/pregunta/dto/pregunta.crear.dto';

@Controller('encuesta')
export class EncuestaController {
    constructor(private _encuestaService: EncuestaService){}

    @Post()
    async crear(@Body() encuestaCrearDto:EncuestaCrearDto){
        const resultado= await this._encuestaService.Create(encuestaCrearDto)
        return{ok:true, resultado}
    }
    @Get()
    async Listar(){
        return await this._encuestaService.Consultar()
    }

    // Metodo que me genera la busqueda de una escuesta especifica
    @Get('/:id')
    async EncontrarEncuesta(@Param("id")id:string){
        const resultado= await this._encuestaService.ConsultarEncuestaxId(id)
        if(resultado==null){ throw new HttpException("no encontrado", HttpStatus.NOT_FOUND)
    }
    return resultado
    
    }

    @Patch('/:idE/pregunta/:idP')
    async EncontrarModificarPregunta(@Param("idE")idE:string, @Param("idP") idP:string, @Body() preguntaCrearDto: PreguntaCrearDto){
        const resultado= await this._encuestaService.ModificarPreguntaxEncuesta(idE,idP,preguntaCrearDto)
        if(resultado==null){ throw new HttpException("no encontrado", HttpStatus.NOT_FOUND)
    }
    return{ok:true, resultado}
    }

    
}
