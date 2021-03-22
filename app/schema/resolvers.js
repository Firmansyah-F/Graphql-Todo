const { hashing } = require("../../helper/hashPassword");
const { verifyJwt, generateJwt } = require("../../helper/authJwt");
const { isLoggedIn } = require("../../helper/isLoggedIn");

const resolvers = {
  Query: {
    async users(parent, _, { db }) {
      return await db.user.findAll();
    },

    // async users(parent, _, { db, auth }) {
    //   const { loggedIn, user } = isLoggedIn(auth);
    //   console.log({ user });
    //   if (loggedIn) {
    //     return await db.user.findAll({
    //       // include: db.todo,
    //     });
    //   }
    // },
    async todos(parent, _, { db }) {
      return await db.todo.findAll();
    },
  },

  Mutation: {
    //login
    // async login(_, args, { db }) {
    //   const data = generateJwt(args.email, args.password);
    //   return {
    //     token: data.token,
    //     id: data.id,
    //     email: data.email,
    //     username: data.username,
    //   };
    // },

    //Users
    async createUser(parent, args, { db }) {
      const { salt, hash } = hashing(args.password);

      const userCreate = await db.user.create({
        username: args.username,
        email: args.email,
        password: hash,
        salt: salt,
        photo: args.photo,
      });
      return userCreate;
    },

    async updateUser(parent, args, { db }) {
      const { salt, hash } = hashing(args.password);
      const userUpdate = await db.user.update(
        {
          username: args.username,
          email: args.email,
          password: hash,
          salt: salt,
          photo: args.photo,
        },
        {
          where: { id: args.id },
        }
      );
      if (userUpdate[0]) {
        const user = await db.user.findOne({
          where: { id: args.id },
        });
        return user;
      } else {
        throw new Error("Nothing for update");
      }
    },

    async deleteUser(parent, args, { db }) {
      const delUser = await db.user.destroy({
        where: {
          id: args.id,
        },
      });

      if (delUser) {
        return {
          message: "Berhasil",
        };
      } else {
        throw new Error("Data tidak ada");
      }
    },

    //Todo

    async createTodo(parent, args, { db }) {
      const todoCreate = await db.todo.create({
        userId: args.userId,
        title: args.title,
        description: args.description,
        attachmant: args.attachmant,
      });
      return todoCreate;
    },

    async updateTodo(parent, args, { db }) {
      const todoUpdate = await db.todo.update(
        {
          userId: args.userId,
          title: args.title,
          description: args.description,
          attachmant: args.attachmant,
        },
        {
          where: { id: args.id },
        }
      );
      if (todoUpdate[0]) {
        const todo = await db.todo.findOne({
          where: { id: args.id },
        });
        return todo;
      } else {
        throw new Error("Nothing for update");
      }
    },

    async deleteTodo(parent, args, { db }) {
      const delTodo = await db.todo.destroy({
        where: {
          id: args.id,
        },
      });

      if (delTodo) {
        return {
          message: "Berhasil",
        };
      } else {
        throw new Error("Data tidak ada");
      }
    },
  },
};
module.exports = {
  resolvers,
};
