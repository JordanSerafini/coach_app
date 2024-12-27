import {
  Injectable,
  Inject,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { CustomLogger } from './logging/custom-logger.service';
import { RegisterDto } from './Dtos/register.dto';

@Injectable()
export class AuthService {
  private readonly logger = new CustomLogger(AuthService.name);

  constructor(
    @Inject('PG_CONNECTION') private readonly pool: Pool,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    this.logger.log(`Validating user with email: ${email}`);
    let result;
    try {
      const query = `SELECT * FROM "users" WHERE email = $1`;
      result = await this.pool.query(query, [email]);
    } catch (error) {
      this.logger.error(
        `Database query failed for email: ${email}`,
        error.stack,
      );
      throw new InternalServerErrorException('Database query failed');
    }

    if (result.rows.length === 0) {
      this.logger.warn(`User with email: ${email} not found`);
      return null;
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      this.logger.log(`User with email: ${email} validated successfully`);
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      return userWithoutPassword;
    }

    this.logger.warn(`Invalid password for user with email: ${email}`);
    return null;
  }

  async login(user: any): Promise<{ access_token: string; user: any }> {
    this.logger.log(`Logging in user with email: ${user.email}`);

    try {
      // Génération du token JWT
      const payload = { email: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(payload, {
        secret: 'mdp',
        expiresIn: '100d',
      });

      // Mise à jour du token dans la base de données
      const query = `UPDATE "users" SET token = $1 WHERE id = $2`;
      await this.pool.query(query, [accessToken, user.id]);

      // Mise à jour de l'objet `user` avec le nouveau token
      user.token = accessToken;

      this.logger.log(`User with email: ${user.email} logged in successfully`);

      // Retourne le token d'accès et les informations utilisateur
      return {
        access_token: accessToken,
        user: user,
      };
    } catch (error) {
      // Gestion des erreurs pour la génération de token ou la mise à jour de la base
      if (error instanceof InternalServerErrorException) {
        this.logger.error(
          `Database update tokens failed for email: ${user.email}`,
          error.stack,
        );
        throw new InternalServerErrorException('Database update failed');
      } else {
        this.logger.error('Token generation failed', error.stack);
        throw new InternalServerErrorException('Token generation failed');
      }
    }
  }

  async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string,
    phone_number: string,
    created_at: Date,
  ): Promise<RegisterDto> {
    this.logger.log(`Registering new user with email: ${email}`);

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const query = `
        INSERT INTO "users" ("email", "password", "first_name", "last_name", "role", "phone_number", "created_at")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const result = await this.pool.query(query, [
        email,
        hashedPassword,
        first_name,
        last_name,
        role,
        phone_number,
        created_at,
      ]);

      this.logger.log(`User with email: ${email} registered successfully`);
      return result.rows[0];
    } catch (error) {
      this.logger.error(
        `Database insert failed for email: ${email}`,
        error.stack,
      );
      throw new InternalServerErrorException('Database insert failed');
    }
  }

  validateToken(token: string): any {
    try {
      this.logger.log(`Validating token`);
      const decoded = this.jwtService.verify(token, {
        secret: 'mdp',
      });
      this.logger.log(`Token validated successfully`);
      return decoded;
    } catch (error) {
      this.logger.error('Token validation failed', error.stack);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async logout(user: { id: string; email: string }): Promise<void> {
    this.logger.log(`Logging out user with email: ${user.email}`);

    try {
      const query = `UPDATE "users" SET token = NULL WHERE id = $1`;
      await this.pool.query(query, [user.id]);

      this.logger.log(`User with email: ${user.email} logged out successfully`);
    } catch (error) {
      this.logger.error(
        `Database update tokens failed for email: ${user.email}`,
        error.stack,
      );
      throw new InternalServerErrorException('Database update failed');
    }
  }
}
