import {
  Column,
  Entity,
  OneToMany,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  site: string;

  @Column({ type: 'varchar' })
  ahubLink: string;

  @Column({ type: 'varchar' }) // must be enum or table
  companyType: string;

  @Column({ type: 'varchar' }) // must be enum or table
  companySize: string;

  @Column({ type: 'varchar' }) // must be enum or table
  industry: string;

  @Column({ type: 'point' })
  location: Point;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'text' })
  aboutCompany: string;

  @OneToMany(() => User, (user) => user.companyId)
  user: User[];
}
