import {
  Body,
  Controller,
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
}
