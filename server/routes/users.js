const express = require("express");
const {
  getSingleUser,
  createUser,
  signIn,
} = require("../controllers/userController");

const router = express.Router();

/**
 * Read Only Permission Routes
 
// GET all users
router.get("/", getAllUsers);
*/
// GET a single user
router.get("/:id", getSingleUser);

/**
 * Read and Write Permission Routes
 */
// POST a new user
router.post("/", createUser);

// POST a user login request
router.post("/login", signIn);

/* DELETE a user
router.delete("/:id", deleteUser);


// UPDATE a user
router.patch("/:id", updateUser);
*/
module.exports = router;
