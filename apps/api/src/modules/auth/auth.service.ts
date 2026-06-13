import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { LoginInput, RegisterInput } from '@bookmyvenue/shared';

@Injectable()
export class AuthService {
  constructor(
    private user: UserService,
    private jwt: JwtService,
  ) {}

  async register(data: RegisterInput) {
    const { email, name, password, role } = data;
    const existingUser = await this.user.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }
    const passwordHash = await argon2.hash(password);
    const newUser = await this.user.create({ email, name, passwordHash, role });
    const { passwordHash: _pass, ...result } = newUser;
    return result;
  }

  async login(user: LoginInput) {
    const { email, password } = user;
    if (!email) {
      throw new BadRequestException('invalid email');
    }
    if (!password) {
      throw new BadRequestException('password is missing');
    }

    const result = await this.validateUser(email, password);
    const payload = { email: result?.email, sub: result.id, role: result.role };
    const accessToken = this.jwt.sign(payload);
    return { accessToken };
  }

  async validateUser(email: string, password: string) {
    const user = await this.user.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const validPassword = await argon2.verify(user?.passwordHash, password);
    if (!validPassword) {
      throw new UnauthorizedException('Invalid password');
    }
    const { passwordHash: _passowrdHash, ...result } = user;
    return result;
  }
}
