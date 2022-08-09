import { Injectable, NotFoundException } from "@nestjs/common";
import { Links } from "./links.entity";
import * as randomstring from "randomstring";
import { LessThan } from "typeorm";
import { LinksRepo } from "./links.repository";
import { CreateLinkDto } from "./dto/create-link.dto";
import { ILink } from "./interfaces/link";
import { Cron, CronExpression } from "@nestjs/schedule";
import { THIRTY_DAYS } from "../../constants";

@Injectable()
export class LinksService {
  constructor(private linksRepository: LinksRepo) {}

  async create(link: CreateLinkDto): Promise<string> {
    const token = randomstring.generate(Number(process.env.TOKEN_LENGTH));
    const newLink: ILink = {
      longLink: link.longLink,
      token: token,
      redirectCount: 0,
      createdAt: new Date(Date.now()),
    };
    return await this.linksRepository.create(newLink);
  }

  async getLongLink(token: Links["token"]): Promise<Links> {
    const existingLink = await this.linksRepository.getLinkByToken(token);
    if (existingLink === null) {
      throw new NotFoundException("This link is not exist");
    }
    return existingLink;
  }

  async updateRedirectCount(link: Links["longLink"]): Promise<any> {
    await this.linksRepository.update(link);
  }

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async entityCleaning() {
    const dateNow = Date.now();
    const validDate = new Date(dateNow - THIRTY_DAYS);
    await this.linksRepository.delete({ createdAt: LessThan(validDate) });
  }
}
