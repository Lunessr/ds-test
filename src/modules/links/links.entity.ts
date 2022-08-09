import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity({ name: "links" })
export class Links {
  @Column({ name: "long_link", type: "text" })
  longLink: string;

  @PrimaryColumn({ name: "token" })
  token: string;

  @Column({ name: "redirect_count", unsigned: true })
  redirectCount: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
