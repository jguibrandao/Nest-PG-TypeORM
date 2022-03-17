import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
    private courses: Course[] = [
        {
            id: 1,
            name: 'curso 1',
            description: 'nestjs',
            tags: ['node.js, nestjs']
        }
    ]

    findAll(): Course[] {
        return this.courses
    }

    findOne(id: string): Course {
        const course = this.courses.find((course) => course.id === Number(id))

        if (!course) {
            throw new NotFoundException()
        }

        return course
    }

    create(createCourseDto: any) {
        this.courses.push(createCourseDto)
    }

    update(id: string, updateCourseDto: any) {
        const courseIndex = this.courses.findIndex(course => course.id === Number(id))
        this.courses[courseIndex] = updateCourseDto
    }

    delete(id: string) {
        const courseIndex = this.courses.findIndex(course => course.id === Number(id))

        if(courseIndex >= 0) {
            this.courses.splice(courseIndex, 1)
        } else throw new HttpException('Not found', 404)
    }
}
