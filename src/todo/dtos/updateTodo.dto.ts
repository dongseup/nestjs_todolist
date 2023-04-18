import { PickType } from '@nestjs/swagger';
import { Todo } from '../entities/todo.entity';
import { IsOptional } from 'class-validator';

export class UpdateTodoDto extends PickType(Todo, ['title', 'desc'] as const) {
  @IsOptional()
  title: string;

  @IsOptional()
  desc: string;
}
