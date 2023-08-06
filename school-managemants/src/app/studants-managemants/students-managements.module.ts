import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admins } from './entities/admin-entity';
import { StudentsManagementsController } from './controllers/studants-managemants.controller';
import { StudentsManagementsService } from './services/studants-managemants.service';
import { StudentsManagementsRepository } from './repository/studants-managemants.repository';
import { Students } from './entities/students-entity';
import { Teachers } from './entities/teacher-entity';
import { StudentsTeacherMap } from './entities/students-teacher-map-entity';
import { AdminController } from './controllers/admin-controller';

@Module({
    imports: [ 
      TypeOrmModule.forFeature([Admins , Students,Teachers,StudentsTeacherMap
    ]),
     ],
      controllers: [StudentsManagementsController,AdminController],
      providers: [StudentsManagementsService,StudentsManagementsRepository],
    })
    export class StudentManagementModule{}