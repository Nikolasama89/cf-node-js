const m2s = require("mongoose-to-swagger")
const User = require("./models/user.model")

exports.options = {
  "components": {
    "schemas": {
      User: m2s(User)
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "security": [
    {"bearerAuth": []}
  ],
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
      },
      "post": {
        "tags": ["Users"],
        "description": "Data of Users that we want to create",
        "requestBody": {
          "description": "Json with user data",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": {"type":"string"},
                  "password": {"type":"string"},
                  "name": {"type":"string"},
                  "surname": {"type":"string"},
                  "email": {"type":"string"},
                  "address": {
                    "type": "object",
                    "properties": {
                      "area": {"type":"string"},
                      "road": {"type":"string"}
                    }
                  }
                },
                "required": ["username", "password", "name", "surname", "email"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "JSON of new user"
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
      },
      "patch": {
        "tags": ["Users"],
        "description": "Update User",
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "Username of User that can update",
            "type": "string"
          }
        ],
        "requestBody": {
          "description": "Data of user to update",
          "content": {
            "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "username": {"type": "string"},
                "name": {"type": "string"},
                "surname": {"type": "string"},
                "email": {"type": "string"},
                "address": {
                  "area": {"type": "string"},
                  "road": {"type": "string"}
                }
              },
              "required": ["email"]
            }
          },
          "responses": {
            "200": {
            "description": "Updated User"
          }
      }
        }
      } 
      },
      "delete": {
        "tags": ["Users"],
        "description": "Delete user from DB",
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": " User to delete",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "User deleted"
          }
        }
      }
    },
    "/api/auth/login": {
      "post": {
        "tags": ["Auth"],
        "description": "Login User",
        "requestBody": {
          "description": "User send username and password and for response we have jwt token",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "username": {"type": "string"},
                  "password": {"type": "string"}
                },
                "required": ["username", "password"]
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Token returned"
          }
        }
      }
    },
    "api/user-product/{username}": {
      "get": {
        "tags": ["Users and Products"],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "decription": "Find user and products",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "desciption": "User and products",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        }
      }
    }
  }
}
