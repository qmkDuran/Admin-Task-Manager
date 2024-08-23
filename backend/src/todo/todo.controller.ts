import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
// Importing necessary decorators and classes from the NestJS framework.

import { FileInterceptor } from '@nestjs/platform-express';
// Importing the FileInterceptor for handling file uploads.

import { TodoService } from './todo.service';
// Importing the TodoService, which contains the business logic for managing todos.

import { Todo } from './todo.entity';
// Importing the Todo entity, which represents the data structure for a todo.

@Controller('todos')
// The @Controller decorator marks this class as a controller, with the route prefix 'todos'.
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  // The constructor injects the TodoService, making it available for use in the controller methods.

  // Fetch all tasks based on their status
  @Get(':status')
  findAll(@Param('status') status: string): Promise<Todo[]> {
    // The @Get decorator creates a GET route for fetching todos based on their status.
    // The ':status' part of the route is a dynamic parameter.
    return this.todoService.findAllByStatus(status);
    // Calls the service method to find all todos with the specified status.
  }

  // Create a new task, optionally with an image
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async createWithImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() todoData: any,
  ): Promise<Todo> {
    // The @Post decorator creates a POST route for creating a new todo with an optional image.
    // @UseInterceptors is used to intercept the file upload and handle it with FileInterceptor.

    const todo = this.prepareTodoEntity(todoData, file);
    // Prepares a new Todo entity from the provided data and the uploaded file.

    return this.todoService.create(todo);
    // Calls the service method to create a new todo and save it to the database.
  }

  // Create a new task without an image
  @Post()
  create(@Body() todo: Todo): Promise<Todo> {
    // The @Post decorator creates a POST route for creating a new todo without an image.
    return this.todoService.create(todo);
    // Calls the service method to create and save the new todo.
  }

  // Update an existing task
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() todoData: any,
  ): Promise<void> {
    // The @Put decorator creates a PUT route for updating an existing todo.
    // @Param is used to get the todo ID from the route parameter.
    // @UploadedFile is used to handle the uploaded file.
    // @Body is used to get the updated data from the request body.

    if (!id) throw new BadRequestException('Invalid todo id');
    // Throw an exception if the provided ID is invalid.

    const updateData = this.prepareTodoData(todoData, file);
    // Prepares the data for updating the todo, including handling the optional file upload.

    try {
      await this.todoService.update(id, updateData);
      // Calls the service method to update the todo with the provided data.
    } catch (error) {
      throw new BadRequestException('Error updating the todo');
      // Throws an exception if there's an error during the update process.
    }
  }

  // Update the status of a task (e.g., move from 'in progress' to 'done')
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ): Promise<Todo> {
    // The @Patch decorator creates a PATCH route for updating the status of a todo.
    // This route is used to change the status of a task (e.g., from 'in progress' to 'done').

    return this.todoService.updateTaskStatus(id, status);
    // Calls the service method to update the status of the todo.
  }

  // Delete a task
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    // The @Delete decorator creates a DELETE route for removing a todo.
    return this.todoService.remove(id);
    // Calls the service method to delete the todo with the provided ID.
  }

  // Helper method to prepare the Todo entity from the provided data
  private prepareTodoEntity(todoData: any, file?: Express.Multer.File): Todo {
    const todo = new Todo();
    // Creates a new Todo entity.

    todo.title = todoData.title;
    todo.description = todoData.description;
    todo.priority = todoData.priority;
    todo.status = todoData.status || 'in progress';
    // Sets the title, description, priority, and status of the todo from the provided data.

    if (file) {
      todo.imageData = this.convertFileToBase64(file);
      // If a file is provided, convert it to base64 and store it in the todo.
    }
    return todo;
    // Returns the prepared todo entity.
  }

  // Helper method to prepare partial Todo data for updates
  private prepareTodoData(
    todoData: any,
    file?: Express.Multer.File,
  ): Partial<Todo> {
    const data: Partial<Todo> = {
      title: todoData.title,
      description: todoData.description,
      priority: todoData.priority,
      status: todoData.status || 'in progress',
    };
    // Prepares partial data for updating the todo, allowing selective updates.

    if (file) {
      data.imageData = this.convertFileToBase64(file);
      // If a file is provided, convert it to base64 and include it in the update data.
    }
    return data;
    // Returns the prepared data for updating the todo.
  }

  // Helper method to convert file to base64
  private convertFileToBase64(file: Express.Multer.File): string {
    return file.buffer.toString('base64');
    // Converts the file buffer to a base64-encoded string.
  }
}
