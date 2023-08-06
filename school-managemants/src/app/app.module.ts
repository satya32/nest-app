import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentManagementModule } from './studants-managemants/students-managements.module';
import { Admins } from './studants-managemants/entities/admin-entity';
import { Students } from './studants-managemants/entities/students-entity';
import { Teachers } from './studants-managemants/entities/teacher-entity';
import { StudentsTeacherMap } from './studants-managemants/entities/students-teacher-map-entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // TypeOrmModule.forFeature([GenerateImage])
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'student_management',
      // entities: [__dirname + '/../**/*.entity.{js,ts}'],
      entities:[Admins , Students,Teachers,StudentsTeacherMap],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: "sk_test_tR3PYbcVNZZ796tH88S4VQ2u",
      signOptions: { expiresIn: '60s' },
    }),
    StudentManagementModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
