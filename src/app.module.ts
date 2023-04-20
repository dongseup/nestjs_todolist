import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
// import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      // configuration 설정을 coifg module 불러 올 때 로드한다
      isGlobal: true,
      envFilePath: '.env.dev',
      load: [configuration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'dongseup_lim',
        password: '1234',
        database: 'todolist',
        // host: configService.get(process.env.DB_HOST),
        // port: configService.get(process.env.DB_PORT),
        // username: configService.get(process.env.DB_USERNAME),
        // password: configService.get(process.env.DB_PASSWORD),
        // database: configService.get(process.env.DB_DATABASE),
        entities: ['dist/**/**.entity{.ts,.js}'],

        synchronize: true,
        logging: true,
        keepConnectionAlive: true,
      }),
    }),
    AuthenticationModule,
    TodoModule,
  ],
  // imports: [UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
