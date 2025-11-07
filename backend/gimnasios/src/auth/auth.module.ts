import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { GoogleStrategy } from './google.strategy';
// GoogleStrategy
@Module({
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
