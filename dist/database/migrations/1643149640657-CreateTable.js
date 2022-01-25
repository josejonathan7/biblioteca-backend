"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTable1643149640657 = void 0;
class CreateTable1643149640657 {
    constructor() {
        this.name = 'CreateTable1643149640657';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tb_autores" ("id" varchar PRIMARY KEY NOT NULL, "name" text(100) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "tb_obras" ("id" varchar PRIMARY KEY NOT NULL, "title" text NOT NULL, "publishingCompany" text(80) NOT NULL, "image" text(250) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "tb_obras_author_tb_autores" ("tbObrasId" varchar NOT NULL, "tbAutoresId" varchar NOT NULL, PRIMARY KEY ("tbObrasId", "tbAutoresId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e701c79beaee00f9b607672c91" ON "tb_obras_author_tb_autores" ("tbObrasId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc011d7e0ec43627bcead56d5f" ON "tb_obras_author_tb_autores" ("tbAutoresId") `);
        await queryRunner.query(`DROP INDEX "IDX_e701c79beaee00f9b607672c91"`);
        await queryRunner.query(`DROP INDEX "IDX_bc011d7e0ec43627bcead56d5f"`);
        await queryRunner.query(`CREATE TABLE "temporary_tb_obras_author_tb_autores" ("tbObrasId" varchar NOT NULL, "tbAutoresId" varchar NOT NULL, CONSTRAINT "FK_e701c79beaee00f9b607672c913" FOREIGN KEY ("tbObrasId") REFERENCES "tb_obras" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_bc011d7e0ec43627bcead56d5fa" FOREIGN KEY ("tbAutoresId") REFERENCES "tb_autores" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("tbObrasId", "tbAutoresId"))`);
        await queryRunner.query(`INSERT INTO "temporary_tb_obras_author_tb_autores"("tbObrasId", "tbAutoresId") SELECT "tbObrasId", "tbAutoresId" FROM "tb_obras_author_tb_autores"`);
        await queryRunner.query(`DROP TABLE "tb_obras_author_tb_autores"`);
        await queryRunner.query(`ALTER TABLE "temporary_tb_obras_author_tb_autores" RENAME TO "tb_obras_author_tb_autores"`);
        await queryRunner.query(`CREATE INDEX "IDX_e701c79beaee00f9b607672c91" ON "tb_obras_author_tb_autores" ("tbObrasId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc011d7e0ec43627bcead56d5f" ON "tb_obras_author_tb_autores" ("tbAutoresId") `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_bc011d7e0ec43627bcead56d5f"`);
        await queryRunner.query(`DROP INDEX "IDX_e701c79beaee00f9b607672c91"`);
        await queryRunner.query(`ALTER TABLE "tb_obras_author_tb_autores" RENAME TO "temporary_tb_obras_author_tb_autores"`);
        await queryRunner.query(`CREATE TABLE "tb_obras_author_tb_autores" ("tbObrasId" varchar NOT NULL, "tbAutoresId" varchar NOT NULL, PRIMARY KEY ("tbObrasId", "tbAutoresId"))`);
        await queryRunner.query(`INSERT INTO "tb_obras_author_tb_autores"("tbObrasId", "tbAutoresId") SELECT "tbObrasId", "tbAutoresId" FROM "temporary_tb_obras_author_tb_autores"`);
        await queryRunner.query(`DROP TABLE "temporary_tb_obras_author_tb_autores"`);
        await queryRunner.query(`CREATE INDEX "IDX_bc011d7e0ec43627bcead56d5f" ON "tb_obras_author_tb_autores" ("tbAutoresId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e701c79beaee00f9b607672c91" ON "tb_obras_author_tb_autores" ("tbObrasId") `);
        await queryRunner.query(`DROP INDEX "IDX_bc011d7e0ec43627bcead56d5f"`);
        await queryRunner.query(`DROP INDEX "IDX_e701c79beaee00f9b607672c91"`);
        await queryRunner.query(`DROP TABLE "tb_obras_author_tb_autores"`);
        await queryRunner.query(`DROP TABLE "tb_obras"`);
        await queryRunner.query(`DROP TABLE "tb_autores"`);
    }
}
exports.CreateTable1643149640657 = CreateTable1643149640657;
