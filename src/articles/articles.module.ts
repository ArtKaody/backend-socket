import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaService } from 'nestjs-prisma';
import { FileUploadsService } from 'src/file-uploads/file-uploads.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService,PrismaService,FileUploadsService],
})
export class ArticlesModule {}
