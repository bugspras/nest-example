import { Injectable } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { testing } from './test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { testDto } from './test.dto';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(testing)
    private readonly repository: Repository<testing>,
  ) {}
  async findAll() {
    try {
      const m = await this.repository
        .createQueryBuilder('testing')
        .leftJoin('test', 'test', 'testing.nik = test.nik')
        .select([
          'testing.nama_lengkap as nama',
          'if(isnull(test.nik),0,test.nik) as nik',
        ])
        .getRawMany();
      return m;
      const usersWithRolesss = await this.repository
        .createQueryBuilder('a')
        .leftJoinAndSelect('test', 'b', 'a.nik = b.nik')
        .getRawMany();
      return usersWithRolesss;
      const usersWithRoles = await this.repository
        .createQueryBuilder()
        .select(['nik as `nomor induk kependudukan`', 'nama_lengkap'])
        .getRawMany();
      return usersWithRoles;

      const entity = await this.repository
        .createQueryBuilder('test')
        .select('test.nik as nik, nama_lengkap')
        .getRawMany();
      return entity;
      return this.repository.find({
        select: ['nik'],
      });
      return this.repository.query(
        `select nik,no_kartu_keluarga,no_hp from testing`,
      );
    } catch (error) {
      return false;
    }
  }
  async findOne(id: string) {
    try {
      return await getConnection().query(
        `select no_kartu_keluarga,no_hp from testing where no_kartu_keluarga='${id}'`,
      );
    } catch (error) {
      return false;
    }
  }

  async create(data: testDto) {
    const m = new testing();
    m.nik = data.nik;
    m.no_kartu_keluarga = data.no_kartu_keluarga;
    m.nama_lengkap = data.nama_lengkap;
    m.no_hp = data.no_hp;
    m.kd_upload_berkas = data.kd_upload_berkas;
    return this.repository.save(m);
  }
  async update(data: testDto, nik: string) {
    const m = new testing();
    m.no_kartu_keluarga = data.no_kartu_keluarga;
    m.nama_lengkap = data.nama_lengkap;
    m.no_hp = data.no_hp;
    m.kd_upload_berkas = data.kd_upload_berkas;
    return this.repository.save({ ...m, nik: String(nik) });
  }

  async delete(nik: string) {
    this.repository.delete(nik);
    return ` delete ${nik}`;
  }
}
