# Socialboard back-end

Server side for Socialboard application (https://github.com/deFarro/socialboard).

Sends user data as a response to GET requests with social network name and ID in the path.

Works in a mock mode:
1. Searches user in the database,
2. Creates new user with requested ID if it can't find any in it's own database,
3. Adds new user to database,
4. Serves JSON file with user data.

---

### Tech stack:
* Node.js
* Express
* Mongoose
