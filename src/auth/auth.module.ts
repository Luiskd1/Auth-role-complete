import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({


  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ||'secretKey',
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
