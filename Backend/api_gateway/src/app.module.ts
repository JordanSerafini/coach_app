import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthController } from './controllers/auth/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mdp',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '100d' },
    }),
    ClientsModule.register([
      {
        name: 'auth_service',
        transport: Transport.TCP,
        options: { port: 3001, host: 'auth_service' },
      },
    ]),
  ],
  providers: [JwtAuthGuard],
  controllers: [AuthController],
})
export class AppModule {}
