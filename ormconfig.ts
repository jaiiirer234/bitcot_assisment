import { DataSource } from "typeorm";
import { User } from "./src/entities/User";

export const AppDataSource =  new DataSource({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"Jai@2727",
    database:"CFT_Test",
    synchronize:true,
    logging:false,
    entities:[User],
})