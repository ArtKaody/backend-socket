
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FileUploadsService } from 'src/file-uploads/file-uploads.service';

@Injectable()
export class ArticlesService {
  constructor(
    private prisma: PrismaService,
    private fileService:FileUploadsService,
  ) { }

  async create(data: any, imageFile?: Express.Multer.File) {
    if (imageFile) {
      data.image = await this.fileService.saveFile(imageFile, 'articles');
    }
    return this.prisma.articles.create({ data });
  }

  async createMany(data: any[]) {
    // Note: Pour createMany, vous devriez peut-être gérer les fichiers différemment
    return this.prisma.articles.createMany({ data });
  }

  findAll() {
    return this.prisma.articles.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.articles.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: number, data: any, imageFile?: Express.Multer.File) {
    // Si un nouveau fichier est fourni
    if (imageFile) {
      // Supprimer l'ancien fichier si il existe
      const article = await this.prisma.articles.findUnique({ where: { id } });
      if (article?.image) {
        await this.fileService.deleteFile(article.image);
      }

      // Sauvegarder le nouveau fichier
      data.image = await this.fileService.saveFile(imageFile, 'articles');
    }

    return this.prisma.articles.update({
      where: { id, deletedAt: null },
      data,
    });
  }

  // Ajouter une méthode pour supprimer proprement un article
  async remove(id: number) {
    const article = await this.prisma.articles.findUnique({ where: { id } });

    if (article?.image) {
      await this.fileService.deleteFile(article.image);
    }

    return this.prisma.articles.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}