const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function runMigration() {
    console.log('Connecting to Aiven Database...');
    
    const dbConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
        multipleStatements: true // Required to run multiple queries at once
    };

    if (process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud.com')) {
        dbConfig.ssl = { rejectUnauthorized: false };
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('✅ Connected successfully!');

        const schemaPath = path.join(__dirname, 'database', 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Running schema.sql...');
        await connection.query(schemaSql);
        
        console.log('✅ Tables created and default users inserted successfully!');
        await connection.end();
    } catch (err) {
        console.error('❌ Migration failed:', err.message);
    }
}

runMigration();
