import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { SUPPORTED_ACL_TYPE } from './enums/supported-acl-type.enum';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../authentication/guard/jwt-auth.guard';
import { UserRequest } from 'src/common/decorator';

@Controller('file')
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  async create(
    @UserRequest() user,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filesService.upload(user.id, file, SUPPORTED_ACL_TYPE.PUBLIC_READ);
  }

  @Post('uploads')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  async uploadFiles(
    @UserRequest() user,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.filesService.uploadMultiPublic(user.id, files);
  }

  // @Get()
  // findAll() {
  //   return this.filesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.filesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
  //   return this.filesService.update(+id, updateFileDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.filesService.remove(+id);
  // }
}
