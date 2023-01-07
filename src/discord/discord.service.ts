import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';

@Injectable()
export class DiscordService {
  constructor(private readonly httpService: HttpService) {}

  async get_callback(code: string) {
    try {
      const get_callback = await this.httpService.axiosRef.post(
        'https://discord.com/api/oauth2/token',

        new URLSearchParams({
          client_id: '1060251866220482611',
          client_secret: 'Pi2oGgKh58we1YaJTlwkmPpddz1Y2IuT',
          code,
          grant_type: 'authorization_code',
          redirect_uri: `http://localhost:3000/discord/callback`,
          scope: 'identify',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': '*',
          },
        },
      );

      return this.get_user(
        get_callback.data.token_type,
        get_callback.data.access_token,
      );
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async get_user(token_type: string, access_token: string) {
    try {
      const user = await this.httpService.axiosRef.get(
        'https://discord.com/api/users/@me',
        {
          headers: {
            authorization: `${token_type} ${access_token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': '*',
          },
        },
      );

      return user.data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}
