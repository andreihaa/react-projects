import express from "express"
import { deleteUser, getAllUsers, getUser, updateUser, isAdmin } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router(); 

router.put("/:id", verifyUser, updateUser)

router.delete("/:id", verifyUser, deleteUser)

router.get("/:id", verifyUser, getUser)

router.get("/", verifyAdmin, getAllUsers)

router.get("/isAdmin", verifyAdmin, isAdmin)

export default router; 


// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user, you are logged in")
// })
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("hello user, you are logged and you can delete your account")
// })
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello admin, you are logged and you can delete all accounts")
// })

// router.post("/", createUser);