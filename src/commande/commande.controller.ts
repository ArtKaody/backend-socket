import { Controller, Get } from '@nestjs/common';
import { CommandeService } from './commande.service';

@Controller('api/commande')
export class CommandeController {
     constructor(private readonly commandeService: CommandeService) {} 

 @Get('count/this/mounth')
    async getSumCommandesThisMonth() {
        return this.commandeService.getSumCommandesThisMonth();
    }

}
