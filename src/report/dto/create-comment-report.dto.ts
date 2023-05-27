import { ApiProperty } from '@nestjs/swagger';
import { reportType } from 'src/utils/common/custom.enum';
import { Report } from '../entities/reprot.entity';
import { Comment } from 'src/article-tab/comments/entities/comment.entity';
import { ReportCommentDto } from 'src/article-tab/dto/comment-report.dto';

export class CreateCommentReportDto {
  @ApiProperty({ example: '1' })
  reporterId: number;

  @ApiProperty({ example: '2' })
  reportedId: number;

  type: reportType;

  targetId: number;

  title: string;

  content: string;

  reason: string;

  static mapDTOToDomain(
    dto: ReportCommentDto,
    reporterId: number,
    targetComment: Comment,
  ): Report {
    const domainReport = new Report();
    domainReport.reporterId = reporterId;
    domainReport.type = reportType.comment;
    domainReport.targetId = targetComment.id;
    domainReport.content = targetComment.content;
    domainReport.reason = dto.reason;
    domainReport.reportedId = targetComment.writerId;

    return domainReport;
  }
}
