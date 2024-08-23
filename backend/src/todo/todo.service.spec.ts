import { Test, TestingModule } from '@nestjs/testing';
// Importing necessary testing utilities from NestJS.

import { TodoService } from './todo.service';
// Importing the TodoService that we want to test.

describe('TodoService', () => {
  // 'describe' is a Jest function used to group related tests together.
  // This block is used to describe and group tests for the TodoService.

  let service: TodoService;
  // Declaring a variable to hold an instance of TodoService.

  beforeEach(async () => {
    // 'beforeEach' is a Jest function that runs before each individual test in this block.
    // It's used to set up any necessary state before running the tests.

    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();
    // Creating a TestingModule with the TodoService registered.
    // 'compile' finalizes the creation of the testing module.

    service = module.get<TodoService>(TodoService);
    // Getting an instance of TodoService from the testing module.
  });

  it('should be defined', () => {
    // 'it' is a Jest function that defines an individual test.
    // This test checks if the service is defined (i.e., it was successfully created).

    expect(service).toBeDefined();
    // The test expects that the service is defined.
  });
});
