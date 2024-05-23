import { config } from "dotenv";
import { resolve } from "path";

const pathConfig = "../../.env";

config({ path: resolve(__dirname, pathConfig) });
