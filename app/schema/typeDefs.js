const { gql } = require("apollo-server-express");
const typeDefs = gql`
    type Query {
        users : [User]
        todos : [Todo]
    }

    type User {
        id : Int
        username : String
        email : String
        password : String
        salt : String
        photo : String
    }

    type Todo {
        id : Int
        userId : Int
        title : String
        description : String
        attachment : String
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
            salt : String
            photo : String
        ):User

        updateUser(
            id : Int
            username : String
            email : String
            password : String
            salt : String
            photo : String
        ):User

        deleteUser(id : Int):User



        createTodo(
            userId : Int
            title : String
            description : String
            attachment : String
        ):Todo

        updateTodo(
            id : Int
            userId : Int
            title : String
            description : String
            attachment : String
        ):Todo

        deleteTodo(id : Int):Todo
    
    
    }
`;

module.exports = {
    typeDefs,
}