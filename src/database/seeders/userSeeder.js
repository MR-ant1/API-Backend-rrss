
import User from "../../models/User.js";
import mongoose, { connect, disconnect } from "mongoose";
import bcrypt from "bcrypt";
import { dbconnection } from "../db.js";
import { faker } from "@faker-js/faker";


const generateFakeUser = () => {
    const userFaker = new User();
    userFaker.firstName = faker.person.firstName(); 
    userFaker.lastName = faker.person.lastName();      
    userFaker.email = faker.internet.email() 
    userFaker.password = bcrypt.hashSync("12345678", 5);
    return userFaker;
}

export const userSeeder = async (req, res) => {
    try {
        const connect = await dbconnection()
        const createdUsers = await User.create([
            {
                firstName: "user",
                lastName: "user",
                email: "user@user.com",
                password: bcrypt.hashSync('12345678', 10),
                role: "user",
                _id: new mongoose.Types.ObjectId("65f00ff4a58ed6fa7fc8d449")
            },

            {
                firstName: "admin",
                lastName: "admin",
                email: "admin@admin.com",
                password: bcrypt.hashSync('12345678', 10),
                role: "admin",
                _id: new mongoose.Types.ObjectId("65f00ff9a58ed6fa7fc8d44b")
            },

            {
                firstName: "super_admin",
                lastName: "super",
                email: "superadmin@superadmin.com",
                password: bcrypt.hashSync('12345678', 10),
                role: "super_admin",
                _id: new mongoose.Types.ObjectId("65f00ffea58ed6fa7fc8d44d")
            }
             
        ])

        const fakeUsers = Array.from({ length: 20 }, generateFakeUser);
        await User.create(fakeUsers)
       

    } catch (error) {
        console.log(error)
    } finally {disconnect(dbconnection())}
}




