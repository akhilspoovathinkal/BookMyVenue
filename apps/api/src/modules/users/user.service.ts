import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  create(data: {
    email: string;
    name: string;
    passwordHash: string;
    role: Role;
  }) {
    return this.prisma.user.create({ data });
  }
}
