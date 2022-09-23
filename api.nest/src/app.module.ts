import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './modules/post/post.module';
import { TaxonomyModule } from './modules/taxonomy/taxonomy.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: `.${process.env.NODE_ENV}.env`,
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
    TaxonomyModule,
    SettingsModule,
  ],
  providers: [],
})
export class AppModule {}
