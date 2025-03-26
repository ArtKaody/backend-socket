import { Module } from '@nestjs/common';
import { PurchaseRequestService } from './purchase-request.service';
import { PurchaseRequestController } from './purchase-request.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  providers: [PurchaseRequestService,PrismaService],
  controllers: [PurchaseRequestController]
})
export class PurchaseRequestModule {}
