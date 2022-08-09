import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LinksController } from "./links.controller";
import { Links } from "./links.entity";
import { LinksRepo } from "./links.repository";
import { LinksService } from "./links.service";

@Module({
  controllers: [LinksController],
  providers: [LinksRepo, LinksService],
  imports: [TypeOrmModule.forFeature([Links])],
  exports: [],
})
export class LinksModule {}
