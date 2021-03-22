const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./app/schema/typeDefs");
const { resolvers } = require("./app/schema/resolvers");
const  db  = require("./app/db/models")
const cloudinary = require("cloudinary")
const fileupload = require('express-fileupload')

app.use(express.json());
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context : ({req}) => {
        const auth = req.headers.authorization
        return {
            req,
            db,
            auth
        }
    },
    playground: {
        settings: {
            "editor.theme": "dark",
        },
    },
    introspection : true
});
server.applyMiddleware({ app })

app.use(fileupload({
    useTempFiles:true
}));
cloudinary.config({
    cloud_name : 'firmansyah-cloud',
    api_key : '232916584845776',
    api_secret :'EnC3QD6Gd8juizUod5st8mBbxSc'
});

app.post("/upload", function(req, res, next){
    const file = req.files.photo;
    console.log(file)
    cloudinary.uploader.upload(file.tempFilePath, function(err, result){
        res.send({
            success : true,
            result
        })
    })
})

app.get("/", async (req, res) => {
    return res.json({
        message: "welcome",
    });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});