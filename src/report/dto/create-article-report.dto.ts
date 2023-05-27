import { ApiProperty } from '@nestjs/swagger';
import { Report } from '../entities/reprot.entity';
import { User } from 'aws-sdk/clients/budgets';
import { reportType } from 'src/utils/common/custom.enum';
import { ReportArticleDto } from 'src/article-tab/dto/article-report.dto';
import { Article } from 'src/article-tab/articles/entities/article.entity';

export class CreateArticleReportDto {
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
    dto: ReportArticleDto,
    reporterId: number,
    targetArticle: Article,
  ): Report {
    const domainReport = new Report();
    domainReport.reporterId = reporterId;
    domainReport.type = reportType.article;
    domainReport.targetId = targetArticle.id;
    domainReport.title = targetArticle.title;
    domainReport.content = targetArticle.content;
    domainReport.reason = dto.reason;
    domainReport.reportedId = targetArticle.writerId;

    return domainReport;
  }
}
