import { ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { exceptionsFilter } from "./errors/exception.filter";

async function start() {
  const port = Number(process.env.SERVER_PORT);
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new exceptionsFilter(httpAdapter));

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

start();
