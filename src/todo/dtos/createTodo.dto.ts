import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Todo } from '../entities/todo.entity';

export class CreateTodoDto extends PickType(Todo, ['title', 'desc'] as const) {
  @IsString()
  title: string;

  @IsString()
  desc: string;
}
