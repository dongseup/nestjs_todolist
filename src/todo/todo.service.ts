import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { UpdateTodoDto } from './dtos/updateTodo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async createTodo(CreateTodoDto: CreateTodoDto) {
    return await this.todoRepository.save(CreateTodoDto);
  }

  async getTodos() {
    return await this.todoRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async updateTodo(param, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({
      where: {
        id: param.todoId,
      },
    });

    if (!updateTodoDto.title && !updateTodoDto.desc) {
      // 400 error
      throw new HttpException(
        '최소 하나의 값이 필요합니다.',
        HttpStatus.FORBIDDEN,
      );
    }

    todo.title = updateTodoDto.title;
    todo.desc = updateTodoDto.desc;

    return this.todoRepository.save(todo);
  }

  async deleteTodo(param: { todoId: string }) {
    return await this.todoRepository.delete(param.todoId);
  }

  async toggleComplete(param: { todoId: string }) {
    const todo = await this.todoRepository.findOne({
      where: {
        id: +param.todoId,
      },
    });

    todo.isDone = !todo.isDone;

    return await this.todoRepository.save(todo);
  }
}
