import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  getUsers() {
    return this.usersRepository.find({
      select: ['id', 'username'],
    });
  }

  createUser(createUserDto: CreateUsersDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  findUsersById(id: number) {
    return this.usersRepository.findOne({
      select: ['id', 'username'],
      where: { id },
    });
  }
}
