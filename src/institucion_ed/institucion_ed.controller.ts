import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Institucion_EdService } from './service/institucion_ed.service';
import { Institucion_EdCrearDto } from './dto/institucion_ed-crear.dto';

@Controller('institucion')
export class InstitucionEdController {

    constructor(private _institucion_edService: Institucion_EdService){}

    @Post()
    async crear(@Body() institucion_edCrearDto:Institucion_EdCrearDto){
        const resultado= await this._institucion_edService.Create(institucion_edCrearDto)
        return{ok:true, resultado}
    }
    @Get()
    async Listar(){
        return await this._institucion_edService.Consultar()
    }

    @Patch("insertar/:sede")
    async insertarP(@Param("sede") sede:string, @Body() institucion_edCrearDto: Institucion_EdCrearDto){
        const resultado= await this._institucion_edService.adicionarSede(sede,institucion_edCrearDto)
        if(resultado==null){
            throw new HttpException("no encontrado", HttpStatus.NOT_FOUND)
        }
        return resultado
    }


    // Insertar Sede por id x IE
    @Patch("insertarSede/:id")
    async insertarSede(@Param("id") sede:string, @Body() institucion_edCrearDto: Institucion_EdCrearDto){
        const resultado= await this._institucion_edService.adicionarSedexIdIE(sede,institucion_edCrearDto)
        if(resultado==null){
            throw new HttpException("no encontrado", HttpStatus.NOT_FOUND)
        }
        return resultado
    }

    @Get("All")
    async obtenerTodo(){
        return await this._institucion_edService.getIEWithSede()
    }

    @Get(":sede")
    
        async consultarxDimension(@Param("sede") sede:string){
        const resultado= await this._institucion_edService.ConsultarUnoxSede(sede)
        if(resultado==null){
            throw new HttpException("no encontrado", HttpStatus.NOT_FOUND)
        }
        return resultado
    }
}
