import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Request,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ArticlesRepository } from './repository/article.repository';
import { ShowArticlesDto, ShowOneArticleDto } from './dto/show-article.dto';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';

@ApiTags('게시판 글')
@Controller({
  path: 'articles',
  version: '1',
})
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly usersService: UsersService,
    private readonly articlesRepository: ArticlesRepository,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  create(
    @Request() req,
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() file,
  ) {
    createArticleDto.writerId = req.user.id;
    return this.articlesService.create(createArticleDto, file);
  }

  @Get('/pages/:page')
  @ApiProperty({ type: IPaginationOptions })
  @ApiResponse({
    status: 200,
    type: [ShowArticlesDto],
    description: 'Article의 배열 json',
  })
  findAll(@Param() paginationOptions: IPaginationOptions) {
    // return this.articlesService.findManyWithPagination(paginationOptions);
    return this.articlesRepository.findArticleList(paginationOptions);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: ShowOneArticleDto,
  })
  async findOne(@Param('id') id: string) {
    // return this.articlesService.findOne(+id);
    const article = await this.articlesRepository.findArticle(+id);
    if (article == null) {
      throw new NotFoundException(`${id}는 삭제되었거나, 없는 글입니다.`);
    }
    const userInfo = await this.usersService.findById(+article['writerId']);
    article['user'] = userInfo;
    return article;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const userId = req.user.id;
    const article = await this.articlesRepository.findArticle(+id);
    if (article == null) {
      throw new NotFoundException(`${id}는 삭제되었거나, 없는 글입니다.`);
    }
    if (userId !== article['writerId']) {
      throw new ForbiddenException(
        `${id}번째 글에 대해 수정/삭제 권한이 없습니다.`,
      );
    }
    return this.articlesService.update(+id, updateArticleDto);
    // When the (unary) + operator is applied to a string,
    // it tries to convert the string to a numeric value.
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Request() req, @Param('id') id: string) {
    const userId = req.user.id;
    const article = await this.articlesRepository.findArticle(+id);
    if (article == null) {
      throw new NotFoundException(`${id}는 삭제되었거나, 없는 글입니다.`);
    }
    if (userId !== article['writerId']) {
      throw new ForbiddenException(
        `${id}번째 글에 대해 수정/삭제 권한이 없습니다.`,
      );
    }
    return this.articlesService.remove(+id);
  }
}
