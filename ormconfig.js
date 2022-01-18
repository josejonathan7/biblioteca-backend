// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");

dotenv.config({
	path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

module.exports = {
	"name": "sqliteDb",
	"type": "sqlite",
	"database": process.env.DATABASE_PATH,
	"entities": ["./src/entitys/*.ts"],
	"migrations": ["./src/database/migrations/*.ts"],
	"cli": {
		"entitiesDir": "./src/entitys",
		"migrationsDir": "./src/database/migrations"
	}
};
