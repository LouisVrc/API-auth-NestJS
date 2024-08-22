import { Injectable } from '@nestjs/common';
import { AuthBody } from './auth.controller';
import { PrismaService } from 'src/user/prisma.service';
import {hash, compare} from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly prisma : PrismaService) {}
    async login({authBody}: {authBody: AuthBody}) {
        const {email, password} = authBody;

        const hashPassword = await this.hashPassword({password})
        console.log({hashPassword, password});

        const existingUser = await this.prisma.user.findUnique({
            where : {
                email,
            }
        })

        if (!existingUser) {
            throw new Error ("L'utilisateur n'existe pas.")
        }

        const isPasswordValid = await this.isPasswordValid({
            password,
            hashedPassword : existingUser.password,
        });

        if (!isPasswordValid) {
            throw new Error ("Le mot de passe est invalide.")
        }

        return existingUser;
        
    }

   private async hashPassword({ password}: {password:string}){
        const hashedPassword = hash(password, 10)
        return hashedPassword
    }
    private async isPasswordValid({ password, hashedPassword}: {password:string; hashedPassword : string}){
        const isPasswordValid = await compare(password, hashedPassword)
        return isPasswordValid
    }
}
