"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const todo_service_1 = require("./todo.service");
const todo_entity_1 = require("./todo.entity");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    findAll(status) {
        return this.todoService.findAllByStatus(status);
    }
    async createWithImage(file, todoData) {
        const todo = this.prepareTodoEntity(todoData, file);
        return this.todoService.create(todo);
    }
    create(todo) {
        return this.todoService.create(todo);
    }
    async update(id, file, todoData) {
        if (!id)
            throw new common_1.BadRequestException('Invalid todo id');
        const updateData = this.prepareTodoData(todoData, file);
        try {
            await this.todoService.update(id, updateData);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error updating the todo');
        }
    }
    updateStatus(id, status) {
        return this.todoService.updateTaskStatus(id, status);
    }
    remove(id) {
        return this.todoService.remove(id);
    }
    prepareTodoEntity(todoData, file) {
        const todo = new todo_entity_1.Todo();
        todo.title = todoData.title;
        todo.description = todoData.description;
        todo.priority = todoData.priority;
        todo.status = todoData.status || 'in progress';
        if (file) {
            todo.imageData = this.convertFileToBase64(file);
        }
        return todo;
    }
    prepareTodoData(todoData, file) {
        const data = {
            title: todoData.title,
            description: todoData.description,
            priority: todoData.priority,
            status: todoData.status || 'in progress',
        };
        if (file) {
            data.imageData = this.convertFileToBase64(file);
        }
        return data;
    }
    convertFileToBase64(file) {
        return file.buffer.toString('base64');
    }
};
exports.TodoController = TodoController;
__decorate([
    (0, common_1.Get)(':status'),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "createWithImage", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_entity_1.Todo]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "remove", null);
exports.TodoController = TodoController = __decorate([
    (0, common_1.Controller)('todos'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
//# sourceMappingURL=todo.controller.js.map