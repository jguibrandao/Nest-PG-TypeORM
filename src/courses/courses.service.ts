import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    findAll() {
        return this.courseRepository.find()
    }

    async findOne(id: any) {
        const course = await this.courseRepository.findOneBy({ id: id })
        console.log(course)
        if (!course || course == null) {
            throw new NotFoundException()
        }

        return course
    }

    create(createCourseDto: CreateCourseDto) {
        const course = this.courseRepository.create(createCourseDto)
        return this.courseRepository.save(course)
    }

    async update(id: any, updateCourseDto: UpdateCourseDto) {
        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto
        })

        if(!course) {
            throw new NotFoundException()
        }

        return this.courseRepository.save(course)
    }

    async delete(id: any) {
        const course = await this.courseRepository.findOneBy({ id: id })

        if(!course || course === null) {
            throw new NotFoundException()
        }

        return this.courseRepository.remove(course)
    }
}
