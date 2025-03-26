import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { PurchaseRequestModule } from './purchase-request/purchase-request.module';
import { SupplierModule } from './supplier/supplier.module';
import { ArticlesModule } from './articles/articles.module';
import { FileUploadsService } from './file-uploads/file-uploads.service';



@Module({
  imports: [NotificationModule, PurchaseRequestModule, SupplierModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService, FileUploadsService],
})
export class AppModule {}
