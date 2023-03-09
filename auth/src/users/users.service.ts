import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dtos/users.dto';
import { hashData } from '../utils/index';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const createdUser = this.usersRepository.save(createUserDto);
    return createdUser;
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  async update(updateUserDto: UpdateUserDto) {
    const { userId, ...updateData } = updateUserDto;

    if (updateData.password) {
      updateData.password = hashData(updateData.password);
    }

    if (updateData.refreshToken) {
      updateData.refreshToken = hashData(updateData.refreshToken);
    }

    return this.usersRepository.update(userId, updateData);
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
