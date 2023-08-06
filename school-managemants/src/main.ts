import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
// import { AppModule } from './app.module';
const PORT = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT,()=>{
    console.log(`Server is listening on port${PORT}`)
  });
}
bootstrap();
