import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { CreateAnnouncementDto } from './dto/announcement.dto';

@ApiTags('알림')
@Controller({
  path: 'notifications',
  version: '1',
})
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}
  @Get('unread-count')
  @ApiOperation({
    summary: '읽지 않은 알림',
    description: '읽지 않은 알림 개수를 반환합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getUnreadNotificationsCount(@Request() req) {
    return this.notificationService.getUnreadNotificationsCount(req.user.id);
  }

  @Get('pages/:page')
  @ApiOperation({
    summary: '알림 조회',
    description: '유저의 알림을 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getNotifications(@Request() req, @Param('page') page: number) {
    const newPage: IPaginationOptions = new IPaginationOptions();
    newPage.page = page;
    newPage.limit = 3;
    return this.notificationService.getNotifications(newPage, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '알림 읽음 처리',
    description: '알림을 읽음 처리합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '읽음 처리 성공',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async readNotification(@Request() req, @Param('id') id: number) {
    return this.notificationService.readNotification(id);
  }

  @Post('announcement')
  @ApiOperation({
    summary: '공지사항 알림 생성(운영자용)',
    description: '공지사항 알림을 생성합니다. postman으로 사용할 것 입니다.',
  })
  @ApiResponse({
    status: 201,
    description: '알림 생성 성공',
  })
  async createAnnouncementNotification(
    @Request() req,
    @Body() createAnouncementDto: CreateAnnouncementDto,
  ) {
    return this.notificationService.createAnnouncementNotification(
      createAnouncementDto,
    );
  }
}
