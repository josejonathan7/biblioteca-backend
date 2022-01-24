"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTables1642545545733 = void 0;
class CreateTables1642545545733 {
    constructor() {
        this.name = 'CreateTables1642545545733';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tb_obras" ("id" varchar PRIMARY KEY NOT NULL, "title" text NOT NULL, "publishingCompany" text(80) NOT NULL, "image" text(250) NOT NULL, "authorId" varchar)`);
        await queryRunner.query(`CREATE TABLE "tb_autores" ("id" varchar PRIMARY KEY NOT NULL, "name" text(100) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_tb_obras" ("id" varchar PRIMARY KEY NOT NULL, "title" text NOT NULL, "publishingCompany" text(80) NOT NULL, "image" text(250) NOT NULL, "authorId" varchar, CONSTRAINT "FK_c730921165cbd36eacb588fc8eb" FOREIGN KEY ("authorId") REFERENCES "tb_autores" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tb_obras"("id", "title", "publishingCompany", "image", "authorId") SELECT "id", "title", "publishingCompany", "image", "authorId" FROM "tb_obras"`);
        await queryRunner.query(`DROP TABLE "tb_obras"`);
        await queryRunner.query(`ALTER TABLE "temporary_tb_obras" RENAME TO "tb_obras"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tb_obras" RENAME TO "temporary_tb_obras"`);
        await queryRunner.query(`CREATE TABLE "tb_obras" ("id" varchar PRIMARY KEY NOT NULL, "title" text NOT NULL, "publishingCompany" text(80) NOT NULL, "image" text(250) NOT NULL, "authorId" varchar)`);
        await queryRunner.query(`INSERT INTO "tb_obras"("id", "title", "publishingCompany", "image", "authorId") SELECT "id", "title", "publishingCompany", "image", "authorId" FROM "temporary_tb_obras"`);
        await queryRunner.query(`DROP TABLE "temporary_tb_obras"`);
        await queryRunner.query(`DROP TABLE "tb_autores"`);
        await queryRunner.query(`DROP TABLE "tb_obras"`);
    }
}
exports.CreateTables1642545545733 = CreateTables1642545545733;
