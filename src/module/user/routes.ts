import  Express  from "express";
import UserController from "./controller";

const router = Express.Router();

router.post("/login",
UserController.login
);

router.post("/signup",
UserController.signUp
)

export default router;