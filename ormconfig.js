// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	"name": "sqliteDb",
	"type": "sqlite",
	"database": process.env.NODE_ENV === "test" ? "./__tests__/database.sqlite" : process.env.DATABASE_PATH,
	"entities": process.env.NODE_ENV === "production" ? ["./dist/entitys/*.js"] : ["./src/entitys/*.ts"],
	"migrations": process.env.NODE_ENV === "production" ? ["./dist/database/migrations/*.js"] : ["./src/database/migrations/*.ts"],
	"cli": {
		"entitiesDir": "./src/entitys",
		"migrationsDir": "./src/database/migrations"
	},
	"synchronize": false
};
