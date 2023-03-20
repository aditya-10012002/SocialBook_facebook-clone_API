## Working on a social media web app.

>Making a backend api for the various functionality.

### First is a UserSchema
Routes included:

  - Get a user &nbsp;
    `get("/:id")`
    
  - Get all users &nbsp;
    `get("/all")`

  - Update user &nbsp;
    `put("/:id")`

  - Delete user &nbsp;
    `delete("/:id")`
    
  - Get friends &nbsp;
    `get("/friends/:id")`

  - Follow a user &nbsp;
    `put("/:id/follow")`

  - Unfollow a user &nbsp;
    `put("/:id/unfollow")`


### Second is PostSchema.
Routes included:

  - Create a post &nbsp;
    `post("/")`

  - Update a post &nbsp;
    `put("/:id")`

  - Delete a post &nbsp;
    `delete("/:id")`

  - Like or Dislike a post &nbsp;
    `put("/:id/like")`

  - Get a post &nbsp;
    `get("/:id")`

  - Get timeline posts &nbsp;
    `get("/timeline")`
    
  - Get user's all posts &nbsp;
    `get("/profile/:username")`
    
### Lastly is authentications in UserSchema.
Routes included:

  - Register a user &nbsp;
    `post("/register")`

  - Login a user &nbsp;
    `post("/login")`
