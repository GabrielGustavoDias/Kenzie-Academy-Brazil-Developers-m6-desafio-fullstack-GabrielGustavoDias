import "reflect-metadata";
import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { Client } from "./entities/clients.entity";
import { Contacts } from "./entities/contacts.entity";
import { createMainColumns1679435751878 } from "./migrations/1679435751878-createMainColumns";
import { createRelatedColumns1679436046014 } from "./migrations/1679436046014-createRelatedColumns";
import { confirmRelations1679436173591 } from "./migrations/1679436173591-confirmRelations";
import { addFieldsRequired1679438303755 } from "./migrations/1679438303755-addFieldsRequired";
import { alterFieldCellphone1679496015215 } from "./migrations/1679496015215-alterFieldCellphone";
import { alterFieldClients1679504733680 } from "./migrations/1679504733680-alterFieldClients";
import { hashedPassAlter1679584058587 } from "./migrations/1679584058587-hashedPassAlter";
import { hashedPassAlter1679584039404 } from "./migrations/1679584039404-hashedPassAlter";

const setDataSourceConfig = (): DataSourceOptions => {
  const nodeEnv: string = process.env.NODE_ENV;

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      entities: [Client, Contacts],
      synchronize: true,
    };
  }

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [Client, Contacts],
      migrations: [
        createMainColumns1679435751878,
        createRelatedColumns1679436046014,
        confirmRelations1679436173591,
        addFieldsRequired1679438303755,
        alterFieldCellphone1679496015215,
        alterFieldClients1679504733680,
        hashedPassAlter1679584039404,
        hashedPassAlter1679584058587,
      ],
    };
  }

  return {
    type: "postgres",
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT),
    synchronize: false,
    logging: false,
    entities: [Client, Contacts],
    migrations: [
      createMainColumns1679435751878,
      createRelatedColumns1679436046014,
      confirmRelations1679436173591,
      addFieldsRequired1679438303755,
      alterFieldCellphone1679496015215,
      alterFieldClients1679504733680,
    ],
  };
};

const dataSourceConfig = setDataSourceConfig();
export default new DataSource(dataSourceConfig);
