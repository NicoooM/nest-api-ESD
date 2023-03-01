import { Timestamp } from 'src/Generic/timestamp.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class UploadFile extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ETag: string;

  @Column()
  Location: string;

  @Column()
  key: string;

  @Column()
  Key: string;

  @Column()
  url: string;

  @Column()
  Bucket: string;
}
