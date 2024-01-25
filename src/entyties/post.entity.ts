import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  text: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'point' })
  location: Point;

  @Column({ type: 'int' })
  ownerId: number;

  @Column({
    type: 'text',
  })
  file: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Comment, (comment) => comment.postId)
  comment: Comment[];
}
