import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @ApiProperty({
    example: 'Eat',
    description: '투두리스트 제목',
  })
  @Column('varchar')
  title: string;

  @IsString()
  @ApiProperty({
    example: 'get energy',
    description: '투두리스트 설명',
  })
  @Column('varchar')
  desc: string;

  @Column('boolean', { default: false })
  isDone: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
