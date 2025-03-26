import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplierService } from './supplier.service';


@Controller('api/supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  create(@Body() data: any) {
    return this.supplierService.create(data);
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data : any) {
    return this.supplierService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(+id);
  }
}

