import { ITodos } from 'src/todos/todos.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodosStatusEnum } from './todos_status_enum.entity';

@Entity()
export class Todos implements ITodos {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  title: string;

  @Column({
    default: '',
  })
  description: string;

  @Column({ type: 'int' })
  statusId: number;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({
    nullable: false,
    default: new Date(),
  })
  created_at: Date;

  @Column()
  finished_at: Date;

  @ManyToOne(() => TodosStatusEnum, (tse: TodosStatusEnum) => tse.id)
  public status: TodosStatusEnum;
}
