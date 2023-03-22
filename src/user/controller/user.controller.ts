import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards, Request } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { UserI } from "../models/user.interface";
import { UserService } from "../service/user.service";
import { CreateUserDto } from "../models/dto/CreateUser.dto";
import { LoginUserDto } from "../models/dto/LoginUser.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

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
  login(@Body() loginUserDto: LoginUserDto): Observable<Object> {
    return this.userService.login(loginUserDto).pipe(
      map((jwt: string) => {
        return {
          access_token: jwt,
          token_type: 'JWT',
          expires_in: 10000
        }
      })
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req): Observable<UserI[]> {
    // const user: UserI = req.user;
    // console.log(user);
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number, @Request() req): Observable<UserI> {
    // const user: UserI = req.user;
    // console.log(user);
    return this.userService.findOne(id);
  }
}
