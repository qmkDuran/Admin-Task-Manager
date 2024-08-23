import { Module } from '@nestjs/common';
// Importing the @Module decorator from NestJS, which is used to define a module.

import { TypeOrmModule } from '@nestjs/typeorm';
// Importing the TypeOrmModule from NestJS, which is used for database integration.

import { TodoService } from './todo.service';
// Importing the TodoService, which contains the business logic for managing todos.

import { TodoController } from './todo.controller';
// Importing the TodoController, which handles HTTP requests related to todos.

import { Todo } from './todo.entity';
// Importing the Todo entity, which represents the structure of the todo data in the database.

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  // The 'imports' array allows you to import other modules or features.
  // Here, we're importing the TypeOrmModule and configuring it to work with the 'Todo' entity.
  // 'forFeature' allows you to define which repositories are registered in the current scope.

  providers: [TodoService],
  // The 'providers' array is used to define the services that are available within this module.
  // Here, we're registering the TodoService, which contains the business logic for todos.

  controllers: [TodoController],
  // The 'controllers' array is used to define the controllers that are part of this module.
  // Here, we're registering the TodoController, which handles the incoming HTTP requests.
})
export class TodoModule {}
// The @Module decorator marks this class as a NestJS module.
// This module bundles together the controller, service, and entity related to the Todo feature.
