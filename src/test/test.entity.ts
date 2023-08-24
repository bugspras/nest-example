import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export class testing {
  @PrimaryColumn({
    type: 'varchar',
    length: 30,
    nullable: false,
    unique: true,
  })
  public nik: string;
  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
    unique: true,
  })
  public no_kartu_keluarga: string;
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public nama_lengkap: string;
  @Column({
    type: 'varchar',
    length: 45,
    nullable: false,
  })
  public no_hp: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public kd_upload_berkas: string;
}
