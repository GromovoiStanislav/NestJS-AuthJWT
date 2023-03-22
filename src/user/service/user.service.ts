import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { UserI } from '../models/user.interface';
import { CreateUserDto } from "../models/dto/CreateUser.dto";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    add(user: CreateUserDto): Observable<UserI> {
        return from(this.userRepository.save(user));
    }

    findAll(): Observable<UserI[]> {
        return from(this.userRepository.find());
    }

}
