import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { testing } from './test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { testDto } from './test.dto';

let m;

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(testing)
    private readonly repository: Repository<testing>,
  ) {}
  async findAll() {
    try {
      m = await this.repository
        .createQueryBuilder('a')
        .leftJoin('test', 'b', 'a.nik = b.nik')
        .select([
          'a.nama_lengkap as nama',
          'a.nik as nik',
          'if(isnull(b.nik),"nik belum terdaftar","nik telah terdaftar") as status',
        ])
        .groupBy('a.nik')
        .getRawMany();
      if (Object.keys(m).length !== 0) {
        m = { status: true, pesan: 'data ditemukan', data: m };
      } else {
        m = { status: false, pesan: 'data tidak ditemukan', data: '' };
      }
      return m;
    } catch (error) {
      return false;
    }
  }
  async findOne(nik: string) {
    try {
      m = await this.repository
        .createQueryBuilder('a')
        .leftJoin('test', 'b', 'a.nik = b.nik')
        .select([
          'a.nama_lengkap as nama',
          'a.nik as nik',
          'if(isnull(b.nik),"nik belum terdaftar","nik telah terdaftar") as status',
        ])
        .where({ nik: nik })
        .groupBy('a.nik')
        .getRawMany();
      if (Object.keys(m).length !== 0) {
        m = { status: true, pesan: 'data ditemukan', data: m };
      } else {
        m = { status: false, pesan: 'data tidak ditemukan', data: '' };
      }
      return m;
      return await this.repository.findOne({
        select: ['nama_lengkap', 'nik'],
        where: { nik: nik },
      });
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
