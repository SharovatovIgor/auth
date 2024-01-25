import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { CreateUserValidation, UserCredsDto } from './user/user.dto';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Post('signin')
  async gignIn(@Body() user: CreateUserValidation, @Res({ passthrough: true }) response: Response) {
    const { token, refresh } = await this.appService.signin(user);
    response.cookie('token', refresh, { httpOnly: true })
    return { token };
  }

  @Post('signup')
  async gignUp(@Body() user: UserCredsDto, @Res({ passthrough: true }) response: Response) {
    const { token, refresh } = await this.appService.signup(user);
    response.cookie('token', refresh, { httpOnly: true })
    return { token };
  }

  @UseGuards(AuthGuard)
  @Get('whoim:id')
  async whoIm (@Param() { id }) {
    return await this.appService.whoIam(+id);
  }

  @Post('refresh')
  async refresh (@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    const refresh = req?.headers?.cookie.split('=')[1];
    const { token, newRefresh } = await this.appService.refresh(refresh)
    response.cookie('token', newRefresh, { httpOnly: true })
    return { token };
  }
}
