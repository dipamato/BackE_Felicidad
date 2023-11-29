import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecursosColCrearDto } from './dto/recursos-col.cear.dto';
import { RecursosColService } from './service/recursos-col.service';

@Controller('recursos-col')
export class RecursosColController {

    constructor(private _recursosColService: RecursosColService){}

    @Post()
    async crear(@Body() recursosColCrearDto:RecursosColCrearDto){
        const resultado= await this._recursosColService.Create(recursosColCrearDto)
        return{ok:true, resultado}
    }
    @Get()
    async Listar(){
        const resultado= await this._recursosColService.Consultar()
        return{ok:true, resultado}
    }
}
