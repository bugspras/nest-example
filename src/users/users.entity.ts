import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export class tb_users {
  @PrimaryColumn({
    type: 'varchar',
    length: 8,
    nullable: false,
    unique: true,
  })
  public id: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  public email: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public username: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public photo: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public fullname: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public password: string;
}
