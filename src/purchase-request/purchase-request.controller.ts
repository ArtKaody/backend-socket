import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PurchaseRequestService } from './purchase-request.service';

@Controller('api/purchase-request')
export class PurchaseRequestController {
    constructor(private readonly purchaseRequestService: PurchaseRequestService) { }

    @Post()
    create(@Body() data: any) {
        return this.purchaseRequestService.create(data);
    }

    @Get()
    findAll() {
        return this.purchaseRequestService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.purchaseRequestService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: any) {
        return this.purchaseRequestService.update(+id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.purchaseRequestService.remove(+id);
    }

    @Post(':id/validate/:validatorId')
    async validate(
        @Param('id') id: string,
        @Param('validatorId') validatorId: string,
    ) {
        return this.purchaseRequestService.validatePurchaseRequest(
            parseInt(id),
            parseInt(validatorId),
        );
    }

}
