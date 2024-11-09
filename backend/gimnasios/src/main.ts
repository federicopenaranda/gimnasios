import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { API_PORT } from './config/constants';
import { initSwagger } from './app.swagger';

async function bootstrap() {
  	const app = await NestFactory.create(AppModule);
  	const logger = new Logger('Bootstrap');
	const config = app.get(ConfigService);
	initSwagger(app);

  	app.useGlobalPipes(
		new ValidationPipe({
		  transform: true,
		  whitelist: true,
		}),
	);

	app.enableCors({
		origin: '*'
	});

	await app.listen(config.get<string>(API_PORT));
	logger.log(`Server running in port: ${await app.getUrl()}`);
}
bootstrap();
