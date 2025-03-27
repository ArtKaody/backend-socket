import { Module } from '@nestjs/common';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  providers: [CommandeService ,PrismaService],
  controllers: [CommandeController]
})
export class CommandeModule {}
