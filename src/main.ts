import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'Recruiter Webservice',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('Recruiter Webservice')
    .setDescription('Recruiter Webservice to manage users, their roles and, their previleges.')
    .setVersion('1.0')
    .addTag('Recruiter Webservice')
    .addBearerAuth({ in: 'header', type: 'http' }, 'Authorization')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document, customOptions);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
