import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PurchaseRequestService {
    constructor(private readonly prisma: PrismaService) { }
    async create(data: any) {
        return this.prisma.purchaseRequests.create({ data });
    }


    findAll() {
        return this.prisma.purchaseRequests.findMany({
            where: {
                deletedAt: null,
            },
        });
    }

    findOne(id: number) {
        return this.prisma.purchaseRequests.findUnique({
            where: { id, deletedAt: null },
        });
    }

    update(id: number, data: any) {
        return this.prisma.purchaseRequests.update({
            where: { id, deletedAt: null },
            data,
        });
    }

    remove(id: number) {
        return this.prisma.purchaseRequests.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}
