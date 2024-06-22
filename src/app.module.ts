import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { CatModule } from './cat/cat.module';
import { BreedModule } from './breed/breed.module';

@Module({
  imports: [AuthModule, TasksModule, CatModule, BreedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
