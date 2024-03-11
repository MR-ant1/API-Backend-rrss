

import Post from "../../models/Post.js"
import mongoose from "mongoose"
import { dbConnection } from "../../database/db.js";
import { faker } from "@faker-js/faker"
import { handleError } from "../../utils/handleError.js";


const generateFakePost = () => {
    const postFaker = new Post();
    postFaker.title = faker.lorem.sentence();
    postFaker.description = faker.lorem.text();
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

        const fakePosts = Array.from({ length: 40 }, generateFakePost);
        await Post.save(fakePosts);
    } catch (error) {
        handleError(res, "Cant retrieve users", 500)
    }
    finally  {await dbConnection.destroy()}
}

