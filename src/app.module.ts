import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { PurchaseRequestModule } from './purchase-request/purchase-request.module';
import { SupplierModule } from './supplier/supplier.module';


@Module({
  imports: [NotificationModule, PurchaseRequestModule, SupplierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
