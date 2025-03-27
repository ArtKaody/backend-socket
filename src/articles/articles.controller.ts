import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('imageFile')) // ⚠️ Supprimez '[image]'
  create(
    @Body() data: any, // Contiendra name, description, price, etc.
    @UploadedFile() imageFile: Express.Multer.File // Reçoit le fichier
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
  findArticlesWithSuppliers() {
    return this.articlesService.findArticlesWithSuppliers();
  }
}
