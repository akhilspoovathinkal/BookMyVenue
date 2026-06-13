import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createZodDto } from 'nestjs-zod';
import { LoginSchema, RegisterSchema } from '@bookmyvenue/shared';
class RegisterDto extends createZodDto(RegisterSchema) {}
class LoginDto extends createZodDto(LoginSchema) {}
@Controller('/auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }
}
