import { Logger, Module } from '@nestjs/common';
import { AuthService } from './app.service';
import { AuthController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { CustomLogger } from './logging/custom-logger.service';
import { PgConnectionModule } from 'pool_package';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: 'mdp',
      signOptions: { expiresIn: '100d' },
    }),
    PgConnectionModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: Logger, useClass: CustomLogger },
  ],
})
export class AppModule {}
