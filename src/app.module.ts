import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { BlogModule } from './blog/blog.module';
import { GoogleStrategy } from './auth/oauth/google.strategy';
import { FacebookStrategy } from './auth/oauth/facebook.strategy';
import { LinkedInStrategy } from './auth/oauth/linkedin.strategy';
import { SessionSerializer } from './auth/session.serializer';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule,
    JwtModule.register({
      secret: `${process.env.SECRET}`,
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot(),
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, FacebookStrategy, LinkedInStrategy, SessionSerializer],
})
export class AppModule {}
