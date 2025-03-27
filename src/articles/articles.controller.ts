import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { } // Gardez bien 'articlesService' partout

  @Post()
  @UseInterceptors(FileInterceptor('imageFile'))
  create(
    @Body() data: any,
    @UploadedFile() imageFile: Express.Multer.File
  ) {
    return this.articlesService.create({ ...data, imageFile });
  }

  @Post('bulk')
  createMany(@Body() data: any[]) {
    return this.articlesService.createMany(data);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.articlesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }

  @Get('with/supplier')
  async findArticlesWithSuppliers() {
    return await this.articlesService.findArticlesWithSuppliers();

  }


  @Get('total/stock')
  async getTotalStock() {
    const total = await this.articlesService.getTotalStockCount();
    return { total };
  }

  @Get('stock/distribution')
  async getStockDistribution() {
    const distribution = await this.articlesService.getArticleStockDistribution();
    return { data: distribution };
  }


  // Dans votre contrôleur
  @Get('stock/value')
  async getStockValue() {
    return await this.articlesService.getArticlePriceOnStock();
  }

  @Get('urgent/value')
  async getArticlePriceUrgent() {
    return await this.articlesService.getArticlePriceUrgent();
  }

}