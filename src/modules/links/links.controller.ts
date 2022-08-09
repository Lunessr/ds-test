import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Get,
  Redirect,
} from "@nestjs/common";

import { CreateLinkDto } from "./dto/create-link.dto";
import { Links } from "./links.entity";
import { LinksService } from "./links.service";

@Controller("/links")
export class LinksController {
  constructor(private linksService: LinksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() longLink: CreateLinkDto): Promise<string> {
    const token = await this.linksService.create(longLink);
    return process.env.LINKS_ROUTE_URL + token;
  }

  @Redirect()
  @Get(":token")
  @HttpCode(HttpStatus.OK)
  async redirectToLongLink(
    @Param("token") token: Links["token"]
  ): Promise<object> {
    await this.linksService.updateRedirectCount(token);
    const originalLink = await this.linksService.getLongLink(token);
    const url = originalLink.longLink;
    return { statusCode: HttpStatus.MOVED_PERMANENTLY, url };
  }
}
