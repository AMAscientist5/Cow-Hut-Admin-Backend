## Live Link https://cow-hut-backend-admin-auth-khaki.vercel.app/

# Cow Hut Admin Backend
### [Project Live Link](https://classroom.github.com/a/7zzbPsy8)
<hr>

### Project overview:
This project is added The Cow-Hut-Backend and updated, included some more features like admin, login system with token base (JWT), refresh token api. And bcrypt, All passwords for users (including admins, buyers, and sellers) have been hashed using bcrypt. authentication and authorization. authentication middleware to verify the user's token and role before granting access to the specific routes. creating my profile api and my profile update api for specific user etc.  

## Main Part

#### Admin Model Sample :
- _id
- phoneNumber
- role   → enum  → ['admin']    
- password 
- name	
   - firstName
   - lastName
- address
- createdAt
- updatedAt

#### Admin Routes :

Route: /api/v1/admins/create-admin (POST)

Request body: 
 ```json
 {
  "password":"amiadminbujheshunekothakoiyo",
  "role": "admin",
   "name":{
      "firstName": "Mr. Admin"
      "lastName": "Bhai"
    },
  "phoneNumber":"01711111111",
  "address": "Uganda",
}
```
Response: The newly created admin object. ( Didn't send the password in response )
Response Sample Pattern:

```json
{
    "success": true, 
    "statusCode":200,
    "message": "Admin created successfully",
    "data":  {
        "_id":"ObjectId(“6473c6a50c56d0d40b9bb6a3)",  
        "role": "admin",
        "name":{
           "firstName": "Mr. Admin"
           "lastName": "Bhai"
         },
          "phoneNumber":"01711111111",
          "address": "Uganda",
         }
     }

```

Route: /api/v1/admins/login (POST)

To log in, admins must provide their phone number and password. The phone number must be unique in the database. If the login is successful, an access token will be sent in the response and a refresh token will be set in the browser cookie. The admin's _id and role will both be included in the tokens.

##### Here is a more detailed explanation of each step:

- The admins enter their phone number and password into the login form.
- The server validates the phone number and password.
- If the login is successful, the server generates an access token and a refresh token.
- The access token is sent in the response to the user.
- The refresh token is set in the browser cookie.
- The admin's _id and role are included in both the access token and the refresh token.
- The access token is used to authenticate the user for subsequent requests.
- The refresh token can be used to generate a new access token if the old one expires.
- The _id and role are used to identify the admin and their permissions.


Request body: 
 ```json
 {
   "phoneNumber":"01711111111",
   "password": "amiadmin",
}
```
Response: The created access token for the admin.
 
 Response Sample Pattern:
```json

{
    "success": true, 
    "statusCode":200,
    "message": "User logged in successfully",
    "data": {
       "accessToken":  "eyJhbGciOiJIUzI1NiICJ9.eyJ1c2V4NzIzMTcxNCwiZXhwIjoxNjg3MzE4MTE0fQ.Q7j8vtY9r1JeDK_zR6bYInlY", 
       }
  }
```

## Implement Custom Authentication using bcrypt and JWT

### Create a new User 

All passwords for users (including admins, buyers, and sellers) have been hashed using bcrypt.

### Login User

To log in, users must provide their phone number and password. The phone number must be unique in the database. If the login is successful, an access token will be sent in the response and a refresh token will be set in the browser cookie. The user's _id and role will both be included in the tokens.

##### Here is a more detailed explanation of each step:

- The user enters their phone number and password into the login form.
- The server validates the phone number and password.
- If the login is successful, the server generates an access token and a refresh token.
- The access token is sent in the response to the user.
- The refresh token is set in the browser cookie.
- The user's _id and role are included in both the access token and the refresh token.
- The access token is used to authenticate the user for subsequent requests.
- The refresh token can be used to generate a new access token if the old one expires.
- The _id and role are used to identify the user and their permissions.

Route:  /api/v1/auth/login (POST)
Request body:
 ```json
 {
  "phoneNumber":"01711111111",
  "password":"amiuserasbuyerasseller",
}
```
 
 Response: The created access token for the user.
 
 Response Sample Pattern:
```json

{
    "success": true, 
    "statusCode":200,
    "message": "User logged in successfully",
    "data": {
       "accessToken":  "eyJhbGciOiJIUzI1NiICJ9.eyJ1c2V4NzIzMTcxNCwiZXhwIjoxNjg3MzE4MTE0fQ.Q7j8vtY9r1JeDK_zR6bYInlY", 
       }
  }
```

###  Get Refresh Token

To get a new access token, the user will send their refresh token to the authorization server. The authorization server will verify the refresh token and, if it is valid, generate a new access token and return it to the user. The authorization server will also set the refresh token in the user's browser cookie. The new access token will include the user's _id and role.

##### Here is a more detailed explanation of each step:
- The user sends a request to the authorization server with the refresh token as a parameter.
- The authorization server validates the refresh token. This involves checking if the token is still valid and if it belongs to the user who is requesting the new - access token.
- If the refresh token is valid, the authorization server generates a new access token and returns it to the user. The new access token will have a new expiration date, so the user will be able to use it to access protected resources for a longer period of time.
- The authorization server also sets the refresh token in the user's browser cookie.
-  The _id and role are used to identify the user and their permissions.

Route:  /api/v1/auth/refresh-token (POST)

Response: The created access token for the user.
 
 Response Sample Pattern:
```json

{
    "success": true, 
    "statusCode":200,
    "message": "New access token generated successfully !",
    "data": {
       "accessToken":  "eyJhbGciOiJIUzI1NiICJ9.eyJ1c2V4NzIzMTcxNCwiZXhwIjoxNjg3MzE4MTE0fQ.Q7j8vtY9r1JeDK_zR6bYInlY", 
       }
  }
```


### implementation an authentication middleware to verify the user's token and role before granting access to the following routes.

The authentication middleware will check the user's token and role against the database. If the token is valid and the user has the correct role, the middleware will allow the request to proceed. Otherwise, the middleware will deny the request and return an error.

  #### User
  
   - api/v1/users (GET) → Can only be accessed by admin
   - api/v1/users/:id (Single GET) → Can only be accessed by admin
   - api/v1/users/:id (PATCH) → Can only be accessed by admin
   - api/v1/users/:id (DELETE) → Can only be accessed  by admin
     
   #### Cows
   
   - api/v1/cows (POST) → Can only be accessed by seller
   - api/v1/cows (GET) → Can only be accessed by buyer,seller & admin
   - api/v1/cows/:id (Single GET) → Can only be accessed by buyer,seller & admin


   - api/v1/cows/:id (PATCH) → Can only be accessed by the seller of the cow
   - api/v1/cows/:id (DELETE) → Can only be accessed by the seller of the cow

   #### Orders
   - https://example.com/v1/orders (POST) →  Can only  be accessed  by the buyer
     
   - https://example.com/v1/orders (GET) →  Can be accessed only by the admin, by the **` specific buyer `** of this order
      & by the **` specific seller `** of this order

### Create Profile 

Created profile routes to get the user's information & update the information such as name, address, phoneNumber, and password. If the user gives a password in the request payload, password has been hashed the before updating. 

#### Get Profile Information

Route:  /api/v1/users/my-profile (GET)

Request Headers: "authorization": "Your access token"

Response: The specified user's profile information
Response Sample Pattern:

```json
  {
    "success": true, 
    "statusCode":200,
    "message": "User's information retrieved successfully",
    "data": {
      "name": {
         "firstName": "Mr. Admin"
         "lastName": "Bhai"
      },
     "phoneNumber":"01711111111",
     "address": "Uganda",
    }, 
  }
```

#### Update Profile Information (It is dynamic updating)

Route:  /api/v1/users/my-profile (PATCH)

Request Headers: authorization: "Your access token"
Request body:
 ```json
 {
  "password":"mydreamwife",
   "name":{
      "firstName": "Mr. Update Password"
      "lastName": "Bhai"
    },
  "phoneNumber":"01711111111",
  "address": "Namibia",
}
```

Response: The specified user's updated profile information
Response Sample Pattern:

```json
  {
    "success": true, 
    "statusCode":200,
    "message": "User's information retrieved successfully",
    "data": {
      "name": {
         "firstName": "Mr. Admin"
         "lastName": "Bhai"
      },
     "phoneNumber":"01711111111",
     "address": "Uganda",
    }, 
  }
```

## Get a Specific Order Route
 
Route:   api/v1/orders/:id (GET)
Request Param: order's _id


### implementation an auth middleware  to verify the user's token and user role to give access to the following routes.

  #### Orders
   -  api/v1/orders/:id (GET) →  Can be accessed only by the admin, by the **` specific buyer `** of this order
      & by the **` specific seller) `** of this order
   
  
   #### My Profile 
   - api/v1/users/my-profile (GET)  → Can be accessed only by the **` specific user (buyer, seller) `** of the profile
   - api/v1/users/my-profile (PATCH) → Can be accessed only by the **` specific user (buyer, seller) `** of the profile
   - api/v1/admins/my-profile (GET)  → Can be accessed only by the admin of the profile   (Optional Task)
   - api/v1/admins/my-profile (PATCH) → Can be accessed only by the admin of the profile (Optional Task)



  ### Live Link: https://cow-hut-backend-admin-auth-khaki.vercel.app/

  ### Application Routes:
    
   ### Auth (User)
   - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/auth/login (POST)
   - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/auth/signup (POST)
   - Route:  https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/auth/refresh-token (POST)

   ### Auth (Admin)
   - Route:  https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/admins/create-admin (POST)
   - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/admins/login (POST)
 
   ### User
    only admin can access the users api
   - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/users/ (64ab4eb6002a381a892f0a5a admin id to get all the users need to use admin token from the client side)
   - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/users/64ab4e1b002a381a892f0a56 (get Single user)
   - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/users/64ab4e1b002a381a892f0a56 ( update single user)
   - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/users/64ab4f81002a381a892f0a61 ( delete user)

   #### Cows
   - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/cows (POST)
   - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/cows (GET ALL)
   - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/cows/64ab505a06a1d8953225fec4 (Single GET) Included id is saved in database
   - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/cows/64ab505a06a1d8953225fec4 (PATCH) Included an id is saved in database
   - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/cows/64ab505a06a1d8953225fec4 (DELETE) Included id is saved in database

   #### Orders
   - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/orsers (POST)
   - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/orsers (GET)


#### Admin
   -Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/admins/create-admin (POST)

#### My Profile
- Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/users/my-profile (GET)
- Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/users/my-profile (PATCH)


#### Order:
 - Route: https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/orders/64ab50c206a1d8953225fecc (GET)

