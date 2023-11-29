import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PreguntaService } from './service/pregunta.service';
import { PreguntaCrearDto } from './dto/pregunta.crear.dto';

@Controller('pregunta')
export class PreguntaController {


    constructor(private _preguntaService: PreguntaService){}

    @Post()
    async crear(@Body() preguntaCrearDto:PreguntaCrearDto){
        const resultado= await this._preguntaService.Create(preguntaCrearDto)
        return{ok:true, resultado}
    }
    @Get()
    async Listar(){ 
        return await this._preguntaService.Consultar()
    }

    @Patch("/:id")
    async ModificarxId(@Param("id") id:string, @Body()preguntaCRearDto:PreguntaCrearDto){
        const resultado=await this._preguntaService.Modificar(id,preguntaCRearDto)
        return {ok:true, resultado}
    }
}
