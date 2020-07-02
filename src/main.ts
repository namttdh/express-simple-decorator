import "reflect-metadata"; //important
import dotenv from 'dotenv';
import {container} from "tsyringe";
import MainApplication from "./MainApplication";
import Kernel from "./app/Kernel";

dotenv.config(); //config dot .env

container.resolve(Kernel).register();
container.resolve(MainApplication);
