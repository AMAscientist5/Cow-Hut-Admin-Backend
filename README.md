## Live Link https://cow-hut-backend-admin-auth-khaki.vercel.app/

## Application Routes

## Main part

<hr/>

#### Auth (User)

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/auth/login (post)

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/auth/signup (post)

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/auth/refresh-token (post)

#### Auth (Admin)

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/admins/create-admin (post)

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/admins/login (post)

#### User

only admin can access the users api

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/users/ (64ab4eb6002a381a892f0a5a admin id to get all the users need to use admin token from the client side)

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/users/64ab4e1b002a381a892f0a56 (get Single user)

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/users/64ab4e1b002a381a892f0a56 ( update single user)

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/users/64ab4f81002a381a892f0a61 ( delete user)

### Cows

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/cows/ (post)

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/cows/ (get all)

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/cows/64ab505a06a1d8953225fec4 (single get)

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/cows/64ab505a06a1d8953225fec4 (patch)

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/cows/64ab505a06a1d8953225fec4 (delete)

### Orders

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/orsers (post)

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/orsers (get)

## Bonus Part

<hr/>

### Admin

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/admins/create-admin

### My Profile

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/users/my-profile (get)

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/users/my-profile (patch)

### Order

https://cow-hut-backend-admin-auth-khaki.vercel.app/api/v1/api/v1/orders/64ab50c206a1d8953225fecc (get)
