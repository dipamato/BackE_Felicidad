import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { EscalaService } from './service/escala.service';
import { EscalaCrearDto } from './dto/escala-crear.dto';

@Controller('escala')
export class EscalaController {

    constructor(private _escalaService: EscalaService){}

    @Post()
    async crear(@Body() escalaCrearDto:EscalaCrearDto){
        const resultado= await this._escalaService.Create(escalaCrearDto)
        return{ok:true, resultado}
    }
    @Get()
    async Listar(){
        return await this._escalaService.Consultar()
    }
//insertanto pregunta
    @Patch("insertar/:dimension")
    async insertarP(@Param("dimension") dimension:string, @Body() escalaCrearDto: EscalaCrearDto){
        const resultado= await this._escalaService.adicionarPregunta(dimension,escalaCrearDto)
        if(resultado==null){
            throw new HttpException("no encontrado", HttpStatus.NOT_FOUND)
        }
        return resultado
    }

  

    @Get("All")
    async obtenerTodo(){
        return await this._escalaService.getEscalaWithPregunta()
    }

    @Get("Dimension/:dimension")
    
        async consultarxDimension(@Param("dimension") dimension:string){
        const resultado= await this._escalaService.ConsultarUnoxDimension(dimension)
        if(resultado==null){
            throw new HttpException("no encontrado", HttpStatus.NOT_FOUND)
        }
        return resultado
    }
}
