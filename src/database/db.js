
import mongoose from "mongoose";
import "dotenv/config"

export const dbconnection = () => {
    return mongoose.connect(
        process.env.MONGO_URI, {}
    )
}
//Aqui se define la consexion con la base de datos mediante mongoose instanciando la const dbconnection, que usara el parametro proccess.env.MONGO_URI para usar el enlace que conecta con atlas DB