const { gql } = require("apollo-server-express");
const typeDefs = gql`
    type Query {
        users : [User]
        todos : [Todo]
        comments : [Comment]
    }

    type User {
        id : Int
        username : String
        email : String
        password : String
        todos : [Todo]
    }

    type Todo {
        id : Int
        userId : Int
        title : String
        description : String
        comments : [Comment]
    }

    type Comment {
        id : Int
        body : String
        todoId : Int
    }


    type AuthPayload {
        id:Int!
        username :String
        email: String
        token : String
    }


    type Mutation {
        login(email: String, password: String):AuthPayload


        createUser(
            username : String
            email : String
            password : String

        ):User

        updateUser(
            id : Int
            username : String
            email : String
            password : String

        ):User

        deleteUser(id : Int):User



        createTodo(
            userId : Int
            title : String
            description : String
            
        ):Todo

        updateTodo(
            id : Int
            userId : Int
            title : String
            description : String
        ):Todo

        deleteTodo(id : Int):Todo



        createComment(
            body :  String
            todoId : Int
        ):Comment

        updateComment(
            id : Int
            body :  String
            todoId : Int
        ):Comment

        deleteComment(id : Int):Comment
    
    
    }
`;

module.exports = {
    typeDefs,
}