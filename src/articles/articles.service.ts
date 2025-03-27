
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FileUploadsService } from 'src/file-uploads/file-uploads.service';

@Injectable()
export class ArticlesService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileUploadsService,
  ) { }

  async create(data: any) {
    // 1. Destructuration des données
    const { imageFile, ...rest } = data;

    // 2. Validation et transformation des données
    const articleData = {
      name: rest.name,
      description: rest.description,
      price: parseFloat(rest.price),
      category: rest.category,
      supplierId: parseInt(rest.supplierId),
      unite: 'unite', // Valeur par défaut ou à modifier selon vos besoins
      image: '' // Initialisation de l'image
    };

    // 3. Gestion du fichier image
    if (imageFile) {
      try {
        articleData.image = await this.fileService.saveFile(imageFile, 'articles');
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du fichier:', error);
        throw new Error('Échec de la sauvegarde de l\'image');
      }
    }

    // 4. Création de l'article dans la base de données
    try {
      return await this.prisma.articles.create({
        data: articleData
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      throw new Error('Échec de la création de l\'article');
    }
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

  async findArticlesWithSuppliers() {
    return this.prisma.articles.findMany({
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      where: {
        deletedAt: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    }).then(articles =>
      articles.map(article => ({
        ...article,
        supplierName: article.supplier?.name
      }))
    );
  }

  async getTotalStockCount() {
    const result = await this.prisma.articles.aggregate({
      where: {
        deletedAt: null, // Ne compte que les articles non supprimés
      },
      _sum: {
        qttOnStock: true, // Calcule la somme de qttOnStock
      },
    });
    return result._sum.qttOnStock;
  }

  async getArticleStockDistribution() {
    const result = await this.prisma.articles.groupBy({
      by: ['category'],
      where: {
        deletedAt: null, // Seulement les articles non supprimés
        qttOnStock: { gt: 0 } // Seulement les articles avec stock positif
      },
      _sum: {
        qttOnStock: true // Calcule la somme pour chaque groupe
      },
      orderBy: {
        category: 'asc' // Optionnel: tri par catégorie
      }
    });
    // Transforme le résultat dans le format attendu
    return result.map(item => ({
      category: item.category,
      totalQuantity: item._sum.qttOnStock
    }));
  }


  async getArticlePriceOnStock() {
    const result = await this.prisma.articles.aggregate({
      where: {
        deletedAt: null, // Ne pas inclure les articles supprimés
        qttOnStock: { gt: 0 } // Seulement les articles avec stock positif
      },
      _sum: {
        // Calcul: SUM(price * qttOnStock)
        qttOnStock: true // Optionnel: pour vérification
      }
    });
    return result
  }


  async getArticlePriceUrgent() {

    const result = await this.prisma.purchaseRequests.aggregate({
      where: {
        urgent: true,
        deletedAt: null,
        status: 'approved' 
      },
      _sum: {
        price: true
      }
    });

    return result._sum.price

  }

}