import { Column, Entity } from "typeorm";

@Entity("black_ip", { schema: "dragonboy" })
export class BlackIp {
  @Column("varchar", { name: "ip", nullable: true, length: 255 })
  ip: string | null;
}
