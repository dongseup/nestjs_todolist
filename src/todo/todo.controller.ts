import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';
import { UpdateTodoDto } from './dtos/updateTodo.dto';
import { JwtAuthenticationGuard } from 'src/authentication/jwt-authentication.guard';

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
  @UseGuards(JwtAuthenticationGuard)
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
  @UseGuards(JwtAuthenticationGuard)
  async getTodo() {
    return await this.todoService.getTodos();
  }

  @ApiParam({
    name: 'todoId',
    required: true,
    description: 'todo id',
  })
  @Put('/:todoId')
  @UseGuards(JwtAuthenticationGuard)
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
  @UseGuards(JwtAuthenticationGuard)
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
  @UseGuards(JwtAuthenticationGuard)
  async toggleComplete(@Param() param: { todoId: string }) {
    return await this.todoService.toggleComplete(param);
  }
}
