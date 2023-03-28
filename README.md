# Content-Managament App<br>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```
bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Models <br>
### users
| field	| data_type	| constraints | validation |
| -------- | ---------| -----------| ----------------------|
| id | Object | required | None |
| firstname |	string | required | None |
| lastname |	string | required | None |
| email |	string | required | unique, email must conform to email (example: user1@gmail.com) |
| password |	string | required | pasword must contain at least one uppercase, one lowercase, one symbol, and must be at least 8 |
| confirmationCode | string | None | None, Generated automatically on signup |
| isActive | boolean | default: false, changed to true on email verification | None | <br>
### posts
| field	| data_type	| constraints | validation |
| -------- | ---------| -----------| ----------------------|
| id | Object | required | None |
| title | string	| required | None |
| description |	string | optional | unique |
| body |	string | required | None |
| readCount |	Number | increament automaticaly by 1 when the post is queried, default: 0  | None |
| userId | foreign key | required | None | <hr>
## APIs <br>
#### USERS
### Signup User <br> 
 * Route: /api/v1/users/signup
 * Method: POST
 * Body:
 ```
 {
  "email": "doe@example.com",
  "password": "Password1",
  "firstname": "jon",
  "lastname": "doe",
 }
 ```
 * Responses: Success
  ```
  {
    'User created successfully! Please check your mail',
  }
  ```
### Login User
 * Route: /api/v1/users/login
 * Method: POST
 * Body:
 ```
 {
   "password": "Password1",
   "email": 'doe@example.com",
 }
 ```
 * Responses: Success
 ```
 {
   "token": "exampletoken&8ofiwhb.fburu276r4ufhwu4.o82uy3rjlfwebj",
 }
 ```
 ### Email Verification
 * Route: api/v1/users/confirm/:confirmationCode
 * Method: GET
 * Header
   - Authorization: None
 * Responses: Success
 ```
 {
   "Verification Successful.You can now login",
 }
 ```
### Forgot Password
 * Route: api/v1/users/forgot_password
 * Method: POST
 * Header
   - Authorization: None
 * Body:
 ```
 {
   "email": "example@gmail.com",
 }
 ```
 * Responses: Success
 ```
 {
   "password reset link sent, kindly check your mail",
 }
 ```
### Reset Password    
 * Route: api/v1/users/reset_password/:confirmationCode       
 * Method: POST
 * Header
   - Authorization: None
 * Responses:  
 ```
 {
   "password reset successful!!!"
 }
 ```
### Get Profile   
 * Route: api/v1/users/profile
 * Method: GET
 * Header:
   - Authorization: Bearer {token}
 * Query params: None
 * Responses: Success
 ```
 {
    "id": "ydwy-oeji-83y8-ifee",
    "firstName": "Oluseyi",
    "lastName": "Adeegbe",
    "email": "adeegbeoluseyi",
    "password": "@Password1'",
    "isActive": false
 }
 ```
 ### Update User
 * Route: api/v1/users/update_profile
 * Method: PUT
 * Header
   - Authorization: Bearer {token}
 * Body:
 ```
 { 
   "firstname": "exampleName",
   "lastname": "Oluseyi"
 }
 ```
 * Responses: Success
 ```
 {
    "id": "ydwy-oeji-83y8-ifee",
    "firstName": "exampleName",
    "lastName": "Oluseyi",
    "email": "adeegbeoluseyi",
    "isActive": false
 }
 ```
### Delete User
 * Route: api/v1/users/delete_profile
 * Method: DELETE
 * Header
   - Authorization: Bearer {token}
 * Responses: Success
 ```
 {
   "User deleted successfully!",
 }
 ```
 #### POSTS
 ### Create Posts
 * Route: api/v1/posts
 * Method: POST
 * Header
   - Authorization: Bearer {token}
 * Body: 
 ```
 {
    "title": "My Story",
    "description": "Story of my life",
    "body": "Lorem Ipsum Ipsum Ipsum"
 }
 ```
 * Responses: Success
 ```
 {
    "post created successfully!"
 },
 ```
 ### Get Posts
 * Route: api/v1/posts
 * Method: GET
 * Header
   - Authorization: Bearer {token}
 * Body: None
 * Responses: Success
 ```
 [{
    "id": "uodh-jcje-84uj-nei9",
    "title": "My Story",
    "description": "Story of my life",
    "body": "Lorem Ipsum Ipsum Ipsum
 }]......
 ```
 
  ### Get Post
 * Route: api/v1/posts/:id
 * Method: GET
 * Header
   - Authorization: Bearer {token}
 * Params: id
 * Body: None
 * Responses: Success
 ```
 {
    "id": "uodh-jcje-84uj-nei9",
    "title": "My Story",
    "description": "Story of my life",
    "body": "Lorem Ipsum Ipsum Ipsum
 },
 ```
 
 ### Update Post
 * Route: api/v1/posts/:id
 * Method: PUT
 * Params: id
 * Header
   - Authorization: Bearer {token}
  * Body: 
 ```
 {
    "title": "My life",
    "description": "Story of my life",
    "body": "Lorem Ipsum Ipsum Ipsum"
 }
 ```
 * Responses: Success
 ```
 {  
    "id": "yrt7-chef-o9u3-jeoj",
    "title": "My life",
    "description": "Story of my life",
    "body": "Lorem Ipsum Ipsum Ipsum"
    "viewCount": 0,
    "userId": { 
                "id": "ydwy-oeji-83y8-ifee",
                "firstName": "Oluseyi",
                "lastName": "Adeegbe",
                "email": "adeegbeoluseyi",
                "password": "@Password1'",
                "isActive": false
    }
 }
 ```
 ### Delete Post
 * Route: api/v1/posts/:id
 * Method: DELETE
 * Params: id
 * Header
   - Authorization: Bearer {token}
 * Responses: Success
 ```
 {
   Post deleted successfully!,
 }
 ```
 
...

Contributor:
Oluseyi Adeegbe
