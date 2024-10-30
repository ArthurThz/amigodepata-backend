require("dotenv").config();

import http from "http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
