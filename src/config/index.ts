import dotenv from "dotenv";
import path from "path";
import { cwd } from "process";

dotenv.config({path:path.join(cwd(),'.env')})


export const config={
    port:process.env.PORT,
    connectionString:process.env.CONNECTION_STRING
}