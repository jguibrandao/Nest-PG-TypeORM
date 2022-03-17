import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get('list')
    findAll(): Course[] {
        return this.coursesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string): Course {
        return this.coursesService.findOne(id)
    }

    @Post()
    create(@Body() createCourseDto: CreateCourseDto): any {
        this.coursesService.create(createCourseDto)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCourseDto: UpdateCourseDto
        ): any {
         this.coursesService.update(id, updateCourseDto)   
    }

    @Delete(':id')
    delete(@Param('id') id: string): void {
         this.coursesService.delete(id)  
    }
}