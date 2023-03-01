import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashedPassword = bcrypt.hashSync(password, 10);

    return this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  findAll() {
    return this.userRepository.find({
      relations: ['posts', 'comments'],
    });
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.softDelete(id);
  }
}
