import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { from, Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { UserI } from "../user/models/user.interface";


@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {
  }

  generateJwt(user: UserI): Observable<string> {
    const { password, ...userJWT } = user;
    return from(this.jwtService.signAsync({ user:userJWT}));
  }

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  comparePasswords(password: string, storedPasswordHash: string): Observable<any> {
    return from(bcrypt.compare(password, storedPasswordHash));
  }

}
