/// <reference types="multer" />
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    findAll(status: string): Promise<Todo[]>;
    createWithImage(file: Express.Multer.File, todoData: any): Promise<Todo>;
    create(todo: Todo): Promise<Todo>;
    update(id: number, file: Express.Multer.File, todoData: any): Promise<void>;
    updateStatus(id: number, status: string): Promise<Todo>;
    remove(id: number): Promise<void>;
    private prepareTodoEntity;
    private prepareTodoData;
    private convertFileToBase64;
}
