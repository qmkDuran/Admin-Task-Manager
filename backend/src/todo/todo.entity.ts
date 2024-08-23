import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// Importing necessary decorators and classes from TypeORM.

@Entity()
// The @Entity decorator marks this class as a database entity.
// This means that instances of this class will be mapped to records in a database table.
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  // The @PrimaryGeneratedColumn decorator marks this field as the primary key.
  // The value for this field will be automatically generated (auto-incremented).

  @Column()
  title: string;
  // The @Column decorator marks this field as a column in the database.
  // This field will store the title of the todo.

  @Column()
  description: string;
  // This column will store the description of the todo.

  @Column()
  priority: string;
  // This column will store the priority of the todo (e.g., Low, Normal, High, Critical).

  @Column({ default: 'in progress' })
  status: string;
  // This column will store the status of the todo (e.g., in progress, done).
  // The default value for this column is 'in progress', meaning new todos will start with this status.

  @Column({ nullable: true })
  imageData?: string;
  // This column will store the image data for the todo, if any.
  // The column is marked as nullable, meaning it can be empty (null).
  // The '?' indicates that this field is optional in the TypeScript class.
}
