const pg = require('pg');
const { Client } = pg;
let _dbConnection;
const getDbConnection = async () => {
    if (!_dbConnection) {
        const database_url =  process.env.DATABASE_URL || "postgres://qvniyxiuiovyvz:0098143591d7cf4bfb5f50593ac9c9e417df4cfef123421d7c770260cf1a22d7@ec2-34-194-158-176.compute-1.amazonaws.com:5432/d536oabalbkvp";
        
        const client = new Client({connectionString:database_url,ssl:true});
        console.log('connecting to DB ...', database_url );
        await client.connect();
        _dbConnection = client;
        console.log('connecting to DB Done!');
    }
    return _dbConnection;
  };

module.exports = {
    getDbConnection
};