import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLinkDto } from "./dto/create-link.dto";
import { Links } from "./links.entity";

@Injectable()
export class LinksRepo {
  constructor(
    @InjectRepository(Links)
    private linksRepository: Repository<Links>
  ) {}

  async create(linkDto: CreateLinkDto): Promise<string> {
    const newLink = this.linksRepository.create(linkDto);
    await this.linksRepository.save(newLink);
    return newLink.token;
  }

  async getLinkByToken(token: Links["token"]): Promise<Links> {
    return await this.linksRepository.findOne({ token });
  }

  async getLinkByLongLink(longLink: Links["longLink"]): Promise<Links> {
    return await this.linksRepository.findOne({ longLink });
  }

  async getAll(): Promise<Links[]> {
    return await this.linksRepository.find();
  }

  async update(token: Links["token"]): Promise<any> {
    await this.linksRepository
      .createQueryBuilder()
      .select()
      .update()
      .set({ redirectCount: () => "redirect_count + 1" })
      .where({ token: token })
      .execute();
  }

  async delete(params): Promise<void> {
    await this.linksRepository.delete(params);
  }
}
