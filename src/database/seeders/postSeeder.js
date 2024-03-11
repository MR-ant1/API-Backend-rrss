

import Post from "../../models/Post.js"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { dbConnection } from "../../database/db.js";


const generateFakePost = () => {
    const postFaker = new Post();
    postFaker.title = faker.person.Name();
    postFaker.description = faker.internet.email();
    return postFaker;
}

const postSeeder = async (req, res) => {
    try {
        const connect = await dbConnection()
        const createdUsers = await Post.create([
            {
                title: "el primer post de prueba",
                description: "Aqui queda el primer post con el que llevar a cabo pruebas en desarrollo de esta Api rrss",
                userId: new mongoose.Types.objectId("85ef79cbe8e9014c944f52gn"),
                likes: [],
                _id: new mongoose.Types.objectId("ID FORZADA AQUI")
            },

            {
                title: "el segundo post de prueba",
                description: "Aqui queda el segundo post con el que llevar a cabo pruebas en desarrollo de esta Api rrss",
                userId: new mongoose.Types.objectId("85ef79cbe8e9014c944f52gn"),
                likes: [],
                _id: new mongoose.Types.objectId("ID FORZADA AQUI")
            },

            {
                title: "el tercer post de prueba",
                description: "Aqui queda el tercer post con el que llevar a cabo pruebas en desarrollo de esta Api rrss",
                userId: new mongoose.Types.objectId("85ef79cbe8e9014c944f52gn"),
                likes: [],
                _id: new mongoose.Types.objectId("ID FORZADA AQUI")
            },
        ])

        const fakeUsers = Array.from({ length: 50 }, generateFakePost);
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

