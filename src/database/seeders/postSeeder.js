
import Post from "../../models/Post.js"
import mongoose, { connect, disconnect } from "mongoose"
import { dbconnection } from "../db.js";
import { faker } from "@faker-js/faker"


const generateFakePost = () => {
    const postFaker = new Post();
    postFaker.title = faker.lorem.sentence();
    postFaker.description = faker.lorem.text();
    postFaker.userId = new mongoose.Types.ObjectId("65f00ffea58ed6fa7fc8d44d")
    postFaker.authorFirstName = faker.person.firstName("super")
    postFaker.authorLastName = faker.person.lastName("admin")
    return postFaker;
}

export const postSeeder = async (req, res) => {
    try {
        const connect = await dbconnection()
        const createdPosts = await Post.create([
            {
                title: "el primer post de prueba",
                description: "Aqui queda el primer post con el que llevar a cabo pruebas en desarrollo de esta Api rrss",
                userId: new mongoose.Types.ObjectId("65f00ff9a58ed6fa7fc8d44b"),
                authorFirstName: "admin",
                authorLastName: "admin",
                likes: [],
                _id: new mongoose.Types.ObjectId("65f0105cbe31ba92fc8f2814")
            },

            {
                title: "el segundo post de prueba",
                description: "Aqui queda el segundo post con el que llevar a cabo pruebas en desarrollo de esta Api rrss",
                userId: new mongoose.Types.ObjectId("65f00ff9a58ed6fa7fc8d44b"),
                authorFirstName: "admin",
                authorLastName: "admin",
                likes: [],
                _id: new mongoose.Types.ObjectId("65f01069be31ba92fc8f2816")
            },

            {
                title: "el tercer post de prueba",
                description: "Aqui queda el tercer post con el que llevar a cabo pruebas en desarrollo de esta Api rrss",
                userId: new mongoose.Types.ObjectId("65f00ff9a58ed6fa7fc8d44b"),
                authorFirstName: "admin",
                authorLastName: "admin",
                likes: [],
                _id: new mongoose.Types.ObjectId("65f01076be31ba92fc8f2818")
            },
        ])

        const fakePosts = Array.from({ length: 15 }, generateFakePost);
        await Post.create(fakePosts);
    } catch (error) {
        console.log(error)
    } finally { disconnect(dbconnection()) }

}

