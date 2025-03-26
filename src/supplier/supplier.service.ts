import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';


@Injectable()
export class SupplierService {
 constructor(private readonly prisma: PrismaService) { }

  async create(data: any) {
    return this.prisma.suppliers.create({ data });
  }


  findAll() {
    return this.prisma.suppliers.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.suppliers.findUnique({
      where: { id, deletedAt: null },
    });
  }

  update(id: number, data: any) {
    return this.prisma.suppliers.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.suppliers.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
  
  async findOneWithArticles(id: number) {
    return this.prisma.suppliers.findUnique({
      where: { id, deletedAt: null },
      include: {
        articles: {
          where: { deletedAt: null }
        }
      }
    });
  }
}
