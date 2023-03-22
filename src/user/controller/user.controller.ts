import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserI } from "../models/user.interface";
import { UserService } from "../service/user.service";
import { CreateUserDto } from "../models/dto/CreateUser.dto";
import { LoginUserDto } from "../models/dto/LoginUser.dto";

@Controller("users")
export class UserController {

  constructor(private userService: UserService) {
  }

  @Post()
  create(@Body() createdUserDto: CreateUserDto): Observable<UserI> {
    return this.userService.create(createdUserDto);
  }

  @Post("login")
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto): Observable<string> {
    return this.userService.login(loginUserDto);
  }


  @Get()
  findAll(): Observable<UserI[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Observable<UserI> {
    return this.userService.findOne(id);
  }
}
