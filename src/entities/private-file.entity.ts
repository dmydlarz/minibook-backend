import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PrivateFileEntity {
  @PrimaryGeneratedColumn()
  public id: number;
}
