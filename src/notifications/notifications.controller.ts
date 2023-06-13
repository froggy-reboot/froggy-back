import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

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
}
