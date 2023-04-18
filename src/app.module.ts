import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
// import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { join } from 'path';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // configuration 설정을 coifg module 불러 올 때 로드한다
      isGlobal: true,
      load: [configuration],
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
    TodoModule,
  ],
  // imports: [UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
