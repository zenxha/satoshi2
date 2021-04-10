const { Database } = require("@devsnowflake/quick.db");
const db = new Database("./json.sqlite", { table: "json" });
const users = db.createTable("users")

module.exports.db = db
module.exports.users = users