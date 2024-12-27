import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.handleLogin(loginDto);
  }

  // @Post('register')
  // async register(
  //   @Body()
  //   registerDto: {
  //     email: string;
  //     password: string;
  //     name: string;
  //     role: string;
  //   },
  // ) {
  //   return this.handleRegister(registerDto);
  // }

  @Post('validate')
  async validate(@Body() token: { token: string }) {
    return this.authService.validateToken(token.token);
  }

  @MessagePattern({ cmd: 'login' })
  async handleLogin(loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @MessagePattern({ cmd: 'register' })
  async handleRegister(registerDto: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
    phone_number: string;
    created_at: Date;
  }) {
    try {
      const user = await this.authService.register(
        registerDto.first_name,
        registerDto.last_name,
        registerDto.email,
        registerDto.password,
        registerDto.role,
        registerDto.phone_number,
        registerDto.created_at,
      );
      return user;
    } catch (error) {
      console.error(
        `Registration failed for email: ${registerDto.email}`,
        error.message,
      );
      throw new BadRequestException('Registration failed');
    }
  }

  @MessagePattern({ cmd: 'logout' })
  async handleLogout(logoutDto: { user: { id: string; email: string } }) {
    console.log('Received logoutDto:', logoutDto);
    const { user } = logoutDto;

    if (!user || !user.email || !user.id) {
      throw new InternalServerErrorException('User information is incomplete');
    }

    await this.authService.logout(user);
    return { message: `Logout successful for user with email: ${user.email}` };
  }
}
