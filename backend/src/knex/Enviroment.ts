import { Knex } from "knex";
import path from "path";
import dotenv from 'dotenv';

dotenv.config();


export const development: Knex.Config = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(
            __dirname,
            "..",
            "..",
            "..",
            "..",
            "database.sqlite"
        ),
    },
    migrations: {
        directory: path.resolve(__dirname, "..", "migrations"),
    },
    seeds: {
        directory: path.resolve(__dirname, "..", "seeds"),
    },
    pool: {
        afterCreate: (connection: any, done: Function) => {
            connection.run("PRAGMA foreign_keys = ON");
            done();
        },
    },
};

export const production: Knex.Config = {
    client: "mysql2",
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PASSWORD,
        port: Number(process.env.MYSQL_PORT) || 3306,
        ssl: { rejectUnauthorized: false },
    }
};

export const test: Knex.Config = {
    client: "mysql2",
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PASSWORD,
        port: Number(process.env.MYSQL_PORT) || 3306,
        ssl: { rejectUnauthorized: false },
    },
};


export default { development, test, production };