import { Controller, Get, Res, Req, Query } from '@nestjs/common';
import { Response, Request } from 'express';
import { DiscordService } from './discord.service';
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from './utils/cookie.option';

@Controller('discord')
export class DiscordController {
  constructor(private readonly discordService: DiscordService) {}
  @Get('login')
  login(@Res() res: Response) {
    return res.redirect(
      'https://discord.com/oauth2/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fcallback&scope=identify%20email&client_id=1060251866220482611',
    );
  }

  @Get('callback')
  async callback(@Query('code') code: string, @Res() response: Response) {
    const user = await this.discordService.get_callback(code);
    response.cookie('access_token', user.id, accessTokenCookieOptions);
    response.cookie('refresh_token', user.email, refreshTokenCookieOptions);
    return response.redirect('http://localhost:3000/discord/user');
  }

  @Get('user')
  user(@Req() request: Request) {
    return request.cookies;
  }
}
