import express from "express";
import DataTypes from "sequelize";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import { sequelize } from "./db.js";
import { router } from "./routes/index.js";
import { errorHandleMiddleware } from "./middleware/ErrorHandleMiddleware.js";
import { User, Basket, BasketDevice, Device, Type, Brand, Rating, DeviceInfo, TypeBrand } from "./models/models.js";
import fileUpload from "express-fileupload";
import path from 'path';
const __dirname = path.resolve();
import chalk from 'chalk';

const errorMsg = chalk.redBright;
const sucsessMsg = chalk.yellow;

const PORT = process.env.PORT || 7000;
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandleMiddleware)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(sucsessMsg(`!!__________________________App listening on port________________________ ${PORT} !`)));
  } catch (e) {
    console.log(errorMsg(e));
  }
};

start()





















