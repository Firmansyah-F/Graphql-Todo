const { hashing } = require("../../helper/hashPassword");
// const { verifyJwt, generateJwt } = require("../../helper/authJwt");
// const { isLoggedIn } = require("../../helper/isLoggedIn");
const { Op } = require("sequelize");

const resolvers = {
  Query: {
    async users(parent, _, { db }) {
      return await db.user.findAll({
        include: db.todo,
      });
    },

    async todos(parent, _, { db }) {
      return await db.todo.findAll({
        include: db.comment,
      });
    },
    async comments(parent, _, { db }) {
      return await db.comment.findAll();
    },
  },

  Mutation: {

    //----------------------------------------
    //Users
    //----------------------------------------
    async createUser(parent, args, { db }) {
      const { salt, hash } = hashing(args.password);
      const checkUnique = db.user.findAll({
        where: {
          [Op.or]: [{ username: args.username }, { email: args.email }],
        },
      });
      // console.log(checkUnique == null)
      if (checkUnique == undefined) {
        const userCreate = await db.user.create({
          username: args.username,
          email: args.email,
          password: hash,
          salt: salt,
          photo: "",
        });
        return userCreate;
      } else {
        throw new Error("username or email are already in use");
      }
    },

    async updateUser(parent, args, { db }) {
      const { salt, hash } = hashing(args.password);

      const newUserUpdate = {
        id: args.id,
        username: args.username,
        email: args.email,
        password: hash,
        salt: salt,
        photo: "",
      };
      // const ckUnique = db.user.findAll({
      //   where: {
      //     [Op.or]: [{ username: args.username }],
      //   },
      // });
      // console.log(ckUnique == null)
      // if (ckUnique == undefined) {
      const userUpdate = await db.user.update(newUserUpdate, {
        where: { id: args.id },
      });
      if (userUpdate[0]) {
        const user = await db.user.findOne({
          where: { id: args.id },
        });
        return user;
      } else {
        throw new Error("Nothing for update");
      }
      // } else {
      //   throw new Error("username or email are already in use");
      // }
    },

    async deleteUser(parent, args, { db }) {
      const delUser = await db.user.destroy({
        where: {
          id: args.id,
        },
      });
      if (delUser) {
        return {
          message: "DONE",
        };
      } else {
        throw new Error("USER IS NOT FOUND");
      }
    },


    //----------------------------------------
    //Todo
    //----------------------------------------
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
      const upTodo = {
        userId: args.userId,
        title: args.title,
        description: args.description,
        attachmant: "",
      };
      const todoUpdate = await db.todo.update(upTodo, {
        where: { id: args.id },
      });
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
          message: "DONE",
        };
      } else {
        throw new Error("TODO NOT FOUND");
      }
    },


    //----------------------------------------
    // Comment
    //----------------------------------------
    async createComment(parent, args, { db }) {
      const commentCreate = await db.comment.create({
        body: args.body,
        todoId: args.todoId,
      });
      return commentCreate;
    },

    async updateComment(parent, args, { db }) {
      const cUpdate = {
        body: args.body,
        todoId: args.todoId,
      };
      const commentUpdate = await db.comment.update(cUpdate, {
        where: { id: args.id },
      });
      if (commentUpdate[0]) {
        const comment = await db.comment.findOne({
          where: { id: args.id },
        });
        return comment;
      } else {
        throw new Error("Nothing for update");
      }
    },

    async deleteComment(parent, args, { db }) {
      const delComment = await db.comment.destroy({
        where: {
          id: args.id,
        },
      });

      if (delComment) {
        return {
          message: "DONE",
        };
      } else {
        throw new Error("COMMENT IS NOT FOUND");
      }
    },
  },
};
module.exports = {
  resolvers,
};
