import { Test, TestingModule } from '@nestjs/testing';
// Importing the necessary testing utilities from NestJS.

import { TodoController } from './todo.controller';
// Importing the TodoController that we want to test.

describe('TodoController', () => {
  // 'describe' is a Jest function used to group related tests together.
  // This block is used to describe and group tests for the TodoController.

  let controller: TodoController;
  // Declaring a variable to hold an instance of TodoController.

  beforeEach(async () => {
    // 'beforeEach' is a Jest function that runs before each individual test in this block.
    // It's used to set up any necessary state before running the tests.

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
    }).compile();
    // Creating a TestingModule with the TodoController registered.
    // 'compile' finalizes the creation of the testing module.

    controller = module.get<TodoController>(TodoController);
    // Getting an instance of TodoController from the testing module.
  });

  it('should be defined', () => {
    // 'it' is a Jest function that defines an individual test.
    // This test checks if the controller is defined (i.e., it was successfully created).

    expect(controller).toBeDefined();
    // The test expects that the controller is defined.
  });
});
