
import User from "../../models/User.js"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { dbConnection } from "../../database/db.js";


const generateFakeUser = () => {
    const userFaker = new User();
    userFaker.Name = faker.person.Name();       //ATENTO A POSIBLE FALLO SI EN ESTE PRIMERO NO VA EL USERFAKER.
    userFaker.email = faker.internet.email();
    userFaker.password = bcrypt.hashSync("12345678", 5);
    return userFaker;
}

const userSeeder = async (req, res) => {
    try {
        const connect = await dbConnection()
        const createdUsers = await User.create([
            {
                email: "user@user.com",
                password: bcrypt.hashSync('12345678', 10),
                role: "user",
                _id: new mongoose.Types.objectId("65ef57cbe8e9014c944f52gn")
            },

            {
                email: "admin@admin.com",
                password: bcrypt.hashSync('12345678', 10),
                role: "admin",
                _id: new mongoose.Types.objectId("65ef57deh8e9438c944f52gn")
            },

            {
                email: "superadmin@superadmin.com",
                password: bcrypt.hashSync('12345678', 10),
                role: "super_admin",
                _id: new mongoose.Types.objectId("85ef79cbe8e9014c944f52gn")
            }
        ])

        const fakeUsers = Array.from({ length: 20 }, generateFakeUser);
        await User.save(fakeUsers);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Users cant be created",
            error: error.message
        })
    }
    finally  {await dbConnection.destroy()}
}




