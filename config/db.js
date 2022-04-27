const sql = require("mssql");

const dbSettings = {
  user: "sa",
  password: "WilliamJose2295@",
  server: "localhost",
  database: "AutonomaUniversidad",
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getConnection;