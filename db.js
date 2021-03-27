const { Database } = require("@devsnowflake/quick.db");
const db = new Database("./json.sqlite", { table: "json" });
const economy = db.createTable("economy")

module.exports.db = db
module.exports.economy = economy