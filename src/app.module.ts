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
import { FileUploadModule } from './file-upload/file-upload.module';
import { MailingServiceModule } from './mailing-service/mailing-service.module';
import {MailerModule as NodeMailerModule} from '@nestjs-modules/mailer';
import { JobsModule } from './jobs/jobs.module';

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
    FileUploadModule,
    NodeMailerModule.forRoot({
      transport: {
        host: process.env.SMTP_SERVER,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      defaults: {
        from: process.env.SMTP_DEFAULT_SENDER,
      },
    }),
    MailingServiceModule,
    JobsModule
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, FacebookStrategy, LinkedInStrategy, SessionSerializer],
})
export class AppModule {}
