import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';
import { UpdateTodoDto } from './dtos/updateTodo.dto';

@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // swagger logging
  @ApiResponse({
    status: 201,
    description: 'creating new todo',
    type: Todo,
  })
  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.createTodo(createTodoDto);
  }

  // swagger logging
  @ApiResponse({
    status: 200,
    description: 'get todolist',
    type: [Todo],
  })
  @Get()
  async getTodo() {
    return await this.todoService.getTodos();
  }

  @ApiParam({
    name: 'todoId',
    required: true,
    description: 'todo id',
  })
  @Put('/:todoId')
  async updateTodo(
    @Param() param: { todoId: string },
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todoService.updateTodo(param, updateTodoDto);
  }

  @ApiParam({
    name: 'todoId',
    required: true,
    description: 'todo id',
  })
  @Delete(':todoId')
  async deleteTodo(@Param() param: { todoId: string }) {
    return await this.todoService.deleteTodo(param);
  }

  @ApiParam({
    name: 'todoId',
    required: true,
    description: 'todo id',
  })
  @ApiResponse({
    status: 200,
    description: 'todo success',
    type: [Todo],
  })
  @Put('complete/:todoId')
  async toggleComplete(@Param() param: { todoId: string }) {
    return await this.todoService.toggleComplete(param);
  }
}
