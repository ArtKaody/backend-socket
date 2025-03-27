import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CommandeService {
    constructor(
        private prisma: PrismaService) { }

    async getSumCommandesThisMonth() {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const result = await this.prisma.commandes.aggregate({
            where: {
                createdAt: {
                    gte: firstDayOfMonth,
                    lte: lastDayOfMonth
                },
                deletedAt: null
            },
            _sum: {
                purchaseRequestId: true // Agréger via l'ID d'une relation directe n'est pas possible
            }
        });

        // Faire une somme manuelle des prix des PurchaseRequests liées aux commandes
        const commandes = await this.prisma.commandes.findMany({
            where: {
                createdAt: {
                    gte: firstDayOfMonth,
                    lte: lastDayOfMonth
                },
                deletedAt: null
            },
            select: {
                purchaseRequest: {
                    select: {
                        price: true
                    }
                }
            }
        });

        const totalPrice = commandes.reduce((sum, commande) => sum + (commande.purchaseRequest?.price || 0), 0);

        return totalPrice;
    }

}
