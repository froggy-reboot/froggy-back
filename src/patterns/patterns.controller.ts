import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatternsService } from './patterns.service';
import { CreatePatternDto } from './dto/create-pattern.dto';
import { UpdatePatternDto } from './dto/update-pattern.dto';

@Controller('patterns')
export class PatternsController {
  constructor(private readonly patternsService: PatternsService) {}

  @Post()
  create(@Body() createPatternDto: CreatePatternDto) {
    return this.patternsService.create(createPatternDto);
  }

  @Get()
  findAll() {
    return this.patternsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patternsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatternDto: UpdatePatternDto) {
    return this.patternsService.update(+id, updatePatternDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patternsService.remove(+id);
  }
}
