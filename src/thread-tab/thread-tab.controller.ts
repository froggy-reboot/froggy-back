import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ThreadTabService } from './thread-tab.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { CreateThreadDto, CreateThreadReqDto } from './dto/create-thread-dto';
import { ShowThreadsDto } from './threads/dto/show-thread.dto';
import {
  IPaginationOptions,
  ThreadPatternIdPaginationReq,
} from 'src/utils/types/pagination-options';

@ApiTags('스레드')
@Controller({
  path: 'threads',
  version: '1',
})
export class ThreadTabController {
  constructor(private readonly threadTabService: ThreadTabService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 201,
    description: '스레드 작성 성공!',
  })
  async createThread(
    @Request() req,
    @Body() createThreadReqDto: CreateThreadReqDto,
    @UploadedFiles() files,
  ) {
    const thread = await this.threadTabService.createThread(
      createThreadReqDto,
      req.user,
      files,
    );

    return thread;
  }

  @Get('/pages/:page')
  @ApiResponse({
    status: 200,
    type: [ShowThreadsDto],
    description:
      '특정 pattern에 해당하는 threads의 배열 json ( 패턴 피드를 위해 사용합니다. )',
  })
  async getThreadsByAll(
    @Param() paginationOptions: ThreadPatternIdPaginationReq,
  ) {
    const threads = await this.threadTabService.getThreadsByAll();

    return threads;
  }

  @Get('patternId/:patternId/pages/:page')
  @ApiResponse({
    status: 200,
    type: [ShowThreadsDto],
    description:
      '특정 pattern에 해당하는 threads의 배열 json ( 패턴 피드를 위해 사용합니다. )',
  })
  async getThreadsByPatternId(
    @Param() paginationOptions: ThreadPatternIdPaginationReq,
  ) {
    const threads = await this.threadTabService.getThreadsByPatternId(
      paginationOptions,
    );

    return threads;
  }
}
