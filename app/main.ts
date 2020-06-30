import "reflect-metadata"; //important
import dotenv from 'dotenv';
import {autoImportFolder} from "./_core/utilities/helper";
import {container} from "tsyringe";
import MainApplication from "./MainApplication";

dotenv.config(); //config dot .env

autoImportFolder(require("path").join(__dirname, "provider"))

container.resolve(MainApplication);