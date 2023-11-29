import { Body, Controller, Get, Post } from '@nestjs/common';
import { SedeService } from './service/sede.service';
import { SedeCrearDto } from './dto/sede.crear.dto';

@Controller('sede')
export class SedeController {

    constructor(private _sedeService: SedeService){}

    @Post()
    async crear(@Body() sedeCrearDto:SedeCrearDto){
        const resultado=await this._sedeService.Create(sedeCrearDto)
        return{ok:true, resultado}
    }
    @Get()
    async Listar(){
        return await this._sedeService.Consultar()
    }
}
