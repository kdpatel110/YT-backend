import { Router } from "express";
import registerUser from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()
console.log("its here",registerUser);

// router.route("/register").post(registerUser)
// router.route("/register").post(registerUser)
router.post("/register",upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), registerUser)

export default router
// if we use defalut then we can import it with any name , import abc from "xyz.js"  || but if we use {xyz} then in export we must import it like , import {xyz} from"xyz.js