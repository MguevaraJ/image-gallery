require("dotenv").config();
const server = require("./config/server.config");

async function main() {
    await server.listen(server.get("PORT"));
    console.log(`server on port ${server.get("PORT")}`);
}

main();
