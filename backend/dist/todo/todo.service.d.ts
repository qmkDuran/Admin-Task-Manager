import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
export declare class TodoService {
    private readonly todoRepository;
    constructor(todoRepository: Repository<Todo>);
    create(todo: Todo): Promise<Todo>;
    findAllByStatus(status: string): Promise<Todo[]>;
    update(id: number, updateData: Partial<Todo>): Promise<void>;
    remove(id: number): Promise<void>;
    getTodos(status: string): Promise<Todo[]>;
    updateTaskStatus(id: number, status: string): Promise<Todo>;
    getHello(): string;
}
