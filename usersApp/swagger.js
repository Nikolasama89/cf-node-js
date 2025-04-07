const m2s = require("mongoose-to-swagger")
const User = require("./models/user.model")

exports.options = {
  "components": {
    "schemas": {
      User: m2s(User)
    }
  },
  "openapi": "3.1.0",
  "info": {
    "version": "1.0.0",
    "title": "Users and Products CRUD API",
    "description": "An application for creating users and choosing products",
    "contact": {
      "name": "Api Support",
      "url": "http://aueb.gr",
      "email": "support@example.com"
    }
  },
  // Choose where to test it
  "servers": [
    {
      url:"http://localhost:3000",
      description: "Local Server"
    },
    {
      url:"http://www.backend.aueb.gr",
      description: "Testing Server"
    }
  ],
  "tags": [
    {
      "name": "Users",
      "description": "Endpoints for User"
    },
    {
      "name": "Users and Products",
      "description": "Endpoints for users and their products"
    },
    {
      "name": "Auth",
      "decription": "Endpoints for authentication"
    }
  ],
  "paths": {
    "/api/users": {
      "get": {
        "tags":["Users"],
        "description":"Returns a list of all users",
        "responses":{
          "200":{
            "description": "List of all users",
            "content": {
              "application/json": {
                "schema": {
                  "type":"array",
                  "items": {
                    "$ref":"#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      }    
    },
    "/api/users/{username}": {
      "get": {
        "tags": ["Users"],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "Username of user that we want to find",
            "type": "string"
          }
        ],
        "description": "Returns user details for specific username",
        "responses": {
          "200": {
            "description": "User details",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        }
      }
    }
  }
}
