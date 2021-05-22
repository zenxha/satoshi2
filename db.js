const { Database } = require("@devsnowflake/quick.db");
const db = new Database("./json.sqlite", { table: "json" });
const users = db.createTable("users")
const configDB = db.createTable('configDB')

module.exports.db = db
module.exports.users = users
module.exports.configDB = configDB