import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './modules/post/post.module';
import { TaxonomyModule } from './modules/taxonomy/taxonomy.module';
import { NewspaperModule } from './modules/newspaper/newspaper.module';
import { CommentModule } from './modules/comment/comment.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !!Number(process.env.DOCKER)
        ? undefined
        : `.${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('db'),
      }),
    }),
    PostModule,
    NewspaperModule,
    TaxonomyModule,
    CommentModule,
    SettingsModule,
  ],
  providers: [],
})
export class AppModule {}
