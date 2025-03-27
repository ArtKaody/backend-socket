import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { PurchaseRequestModule } from './purchase-request/purchase-request.module';
import { SupplierModule } from './supplier/supplier.module';
import { ArticlesModule } from './articles/articles.module';
import { FileUploadsService } from './file-uploads/file-uploads.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestApplication } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { CommandeModule } from './commande/commande.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to your images folder
      serveRoot: '/static',
    }),
    NotificationModule, 
    PurchaseRequestModule, 
    SupplierModule, 
    ArticlesModule, UsersModule, CommandeModule,
  ],
  controllers: [AppController],
  providers: [AppService, FileUploadsService],
})
export class AppModule implements NestModule {
  constructor(private readonly appService: AppService) {}

  configure(consumer: MiddlewareConsumer) {
    // Configuration du middleware si nécessaire
  }

  static configureSwagger(app: NestApplication) {
    const config = new DocumentBuilder()
      .setTitle('API Gestion des Achats')
      .setDescription('Documentation complète de l\'API de gestion des achats')
      .setVersion('1.0')
      .addTag('articles')
      .addTag('demandes-achat')
      .addTag('fournisseurs')
      .addTag('notifications')
      .addBearerAuth() // Si vous utilisez l'authentification
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }
}