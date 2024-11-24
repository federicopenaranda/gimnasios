import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GimnasioModule } from './gimnasio/gimnasio.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EjercicioModule } from './ejercicio/ejercicio.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environments } from './config/environments';
import {
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_PASSWORD,
	DATABASE_PORT,
	DATABASE_USERNAME,
} from './config/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    GimnasioModule, 
    UsuarioModule, 
    EjercicioModule,
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				type: 'postgres',
				host: config.get<string>(DATABASE_HOST),
				port: parseInt(config.get<string>(DATABASE_PORT)),
				username: config.get<string>(DATABASE_USERNAME),
				password: config.get<string>(DATABASE_PASSWORD),
				database: config.get<string>(DATABASE_NAME),
				entities: [__dirname + './**/**/*entity{.ts,.js}.ts'],
				autoLoadEntities: true,
				synchronize: true,
				// logging: true
			}),
		}),
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: './env/' + environments[process.env.NODE_ENV] || './env/development.env',
		}),
		AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
