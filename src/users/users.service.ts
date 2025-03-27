import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService) { }

    async getUserByEmail(email: string) {
        return await this.prisma.users.findUnique({
            where: {
                email: email,
                deletedAt: null
            }
        });
    }
}
