import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PurchaseRequestService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: {
        label: string;
        price: number;
        status: string;
        urgent?: boolean;
        userId: number;
        validerId?: number;
        articles: Array<{
            articleId: number;
            quantity: number;
            status?: string;
        }>;
    }) {
        return this.prisma.purchaseRequests.create({
            data: {
                label: data.label,
                price: data.price,
                status: data.status,
                urgent: data.urgent || false,
                userId: data.userId,
                validerId: data.validerId,
                PurchaseRequestArticle: {
                    createMany: {
                        data: data.articles.map(article => ({
                            articleId: article.articleId,
                            quantity: article.quantity,
                            status: article.status || 'pending',
                        })),
                    },
                },
            },
            include: {
                PurchaseRequestArticle: {
                    include: {
                        article: true,
                    },
                },
            },
        });
    }

    async findAll() {
        return this.prisma.purchaseRequests.findMany({
            where: {
                deletedAt: null,
            },
            include: {
                PurchaseRequestArticle: {
                    where: {
                        deletedAt: null,
                    },
                    include: {
                        article: true,
                    },
                },
                user: true,
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.purchaseRequests.findUnique({
            where: { id, deletedAt: null },
            include: {
                PurchaseRequestArticle: {
                    where: {
                        deletedAt: null,
                    },
                    include: {
                        article: true,
                    },
                },
                user: true,
            },
        });
    }

    async update(id: number, data: {
        label?: string;
        price?: number;
        status?: string;
        urgent?: boolean;
        validerId?: number;
        articles?: Array<{
            id?: number; // pour les articles existants à mettre à jour
            articleId: number;
            quantity: number;
            status?: string;
            _delete?: boolean; // pour marquer comme supprimé
        }>;
    }) {
        return this.prisma.$transaction(async (prisma) => {
            // Mettre à jour les informations de base de la demande
            const purchaseRequest = await prisma.purchaseRequests.update({
                where: { id, deletedAt: null },
                data: {
                    label: data.label,
                    price: data.price,
                    status: data.status,
                    urgent: data.urgent,
                    validerId: data.validerId,
                },
            });

            // Gérer les articles associés si fournis
            if (data.articles) {
                for (const article of data.articles) {
                    if (article.id) {
                        // Article existant - mise à jour ou suppression
                        if (article._delete) {
                            await prisma.purchaseRequestArticles.update({
                                where: { id: article.id },
                                data: { deletedAt: new Date() },
                            });
                        } else {
                            await prisma.purchaseRequestArticles.update({
                                where: { id: article.id, deletedAt: null },
                                data: {
                                    quantity: article.quantity,
                                    status: article.status,
                                },
                            });
                        }
                    } else {
                        // Nouvel article - création
                        await prisma.purchaseRequestArticles.create({
                            data: {
                                purchaseRequestId: id,
                                articleId: article.articleId,
                                quantity: article.quantity,
                                status: article.status || 'pending',
                            },
                        });
                    }
                }
            }

            return prisma.purchaseRequests.findUnique({
                where: { id },
                include: {
                    PurchaseRequestArticle: {
                        where: {
                            deletedAt: null,
                        },
                        include: {
                            article: true,
                        },
                    },
                },
            });
        });
    }

    async remove(id: number) {
        return this.prisma.$transaction(async (prisma) => {
            // Marquer les articles associés comme supprimés
            await prisma.purchaseRequestArticles.updateMany({
                where: { purchaseRequestId: id },
                data: { deletedAt: new Date() },
            });

            // Marquer la demande comme supprimée
            return prisma.purchaseRequests.update({
                where: { id },
                data: { deletedAt: new Date() },
            });
        });
    }

    async validatePurchaseRequest(id: number, validatorId: number) {
        return this.prisma.purchaseRequests.update({
            where: { id, deletedAt: null },
            data: {
                status: 'validated', // ou 'approved' selon votre logique métier
                validerId: validatorId,
                updatedAt: new Date(),
            },
            include: {
                PurchaseRequestArticle: {
                    where: {
                        deletedAt: null,
                    },
                    include: {
                        article: true,
                    },
                },
                user: true,
            },
        });
    }
}