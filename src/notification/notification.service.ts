import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';


@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: any) {
    return this.prisma.notification.create({ data });
  }


  findAll() {
    return this.prisma.article.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.notification.findUnique({
      where: { id, deletedAt: null },
    });
  }

  update(id: number, data: any) {
    return this.prisma.notification.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.notification.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
  
}
