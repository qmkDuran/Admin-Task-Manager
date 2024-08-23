import { Injectable } from '@nestjs/common';
// Importing the @Injectable decorator from NestJS, which marks this class as a provider that can be injected into other components.

import { InjectRepository } from '@nestjs/typeorm';
// Importing the InjectRepository decorator from TypeORM, used to inject a repository.

import { Repository } from 'typeorm';
// Importing the Repository class from TypeORM, which provides methods to work with the database.

import { Todo } from './todo.entity';
// Importing the Todo entity, which represents the structure of the todo data in the database.

@Injectable()
// The @Injectable decorator marks this class as a service that can be injected into other components.
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}
  // The constructor injects the TodoRepository, allowing the service to interact with the database.
  // The @InjectRepository decorator tells TypeORM which entity this repository is associated with.

  async create(todo: Todo): Promise<Todo> {
    // This method creates a new todo by saving it to the database.
    return this.todoRepository.save(todo);
    // The save method persists the new todo and returns the saved entity.
  }

  async findAllByStatus(status: string): Promise<Todo[]> {
    // This method retrieves all todos with a specific status from the database.
    return this.todoRepository.find({ where: { status } });
    // The find method queries the database for todos that match the given status.
  }

  async update(id: number, updateData: Partial<Todo>): Promise<void> {
    // This method updates an existing todo with new data.
    await this.todoRepository.update(id, updateData);
    // The update method modifies the todo with the specified ID using the provided update data.
  }

  async remove(id: number): Promise<void> {
    // This method deletes a todo from the database.
    await this.todoRepository.delete(id);
    // The delete method removes the todo with the specified ID.
  }

  async getTodos(status: string): Promise<Todo[]> {
    // This method is similar to findAllByStatus, retrieving todos based on their status.
    return this.todoRepository.find({ where: { status } });
    // Again, the find method is used to query todos by status.
  }

  async updateTaskStatus(id: number, status: string): Promise<Todo> {
    // This method updates the status of a specific todo.
    const task = await this.todoRepository.findOneBy({ id });
    // The findOneBy method retrieves the todo with the specified ID.

    if (!task) {
      throw new Error('Task not found');
      // If the todo is not found, throw an error.
    }

    task.status = status;
    // Update the status of the retrieved todo.

    return await this.todoRepository.save(task);
    // Save the updated todo and return it.
  }

  getHello(): string {
    // A simple method that returns a greeting message.
    return 'Hello World!';
    // This could be used as a basic health check or placeholder functionality.
  }
}
