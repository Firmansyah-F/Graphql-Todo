const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./app/schema/typeDefs");
const { resolvers } = require("./app/schema/resolvers");
const  db  = require("./app/db/models")
const cloudinary = require("cloudinary")
const { uploadPhoto, uploadAttachment} = require("./helper/uploadMulter")


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

cloudinary.config({
    cloud_name : 'firmansyah-cloud',
    api_key : '232916584845776',
    api_secret :'EnC3QD6Gd8juizUod5st8mBbxSc'
});

app.patch("/upload/:id/photo", uploadPhoto.single("file"), async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newData = {
      photo: result.url,
    };
    console.log(result)
    const data = await db.user.update(newData, {
      where: {
        id: req.params.id,
      },
    });
    if (data) {
      res.json({ message: "berhasil" });
    }
  });
  
  app.patch(
    "/upload/:id/attachment",
    uploadAttachment.single("file"),
    async (req, res) => {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const newData = {
          attachment: result.url,
        };
        const data = await db.todo.update(newData, {
          where: {
            id: req.params.id,
          },
        });
        if (data) {
          res.json({ message: "berhasil" });
        }
      } catch (error) {
        res.json({
          message:error
        });
      }
    }
  );
  

app.get("/", async (req, res) => {
    return res.json({
        message: "welcome",
    });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});