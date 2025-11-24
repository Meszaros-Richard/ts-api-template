import { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config"
import { User } from "interfaces/user";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).send({success: false, message: "You need to log in!"})
    }

    try {
        req.user = jwt.verify(authHeader.split(' ')[1], config.jwtSecret) as User;

        next();
    }
    catch (err) {
        next(err);
    }
}