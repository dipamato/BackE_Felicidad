import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { UserInfoService } from './service/user-info.service';
import { UserInfoCrearDto } from './dto/user-info.crear.dto';

@Controller('user-info')
export class UserInfoController {


    constructor(private _userInfoService: UserInfoService){}

    @Post()
    async crear(@Body() userInfoCrearDto:UserInfoCrearDto){
        const resultado= await this._userInfoService.Create(userInfoCrearDto)
        return{ok:true, resultado}
    }
    @Get()
    async Listar(){
        return await this._userInfoService.Consultar()
    }

    @Get('/Info')
  async generateReport(@Res() res: any) {
    await this._userInfoService.GenerarInforme(res)
    return 'Informe generado correctamente.';
  }

  @Patch("/:id")
  async ModificarxId(@Param("id") id:string, @Body()userInfoCrearDto:UserInfoCrearDto){
      const resultado=await this._userInfoService.Modificar(id,userInfoCrearDto)
      return {ok:true, resultado}
  }
}
