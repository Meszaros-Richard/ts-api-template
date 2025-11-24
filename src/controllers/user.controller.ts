import { Request, NextFunction, Response } from "express";
import * as service from "../services/user.service";
import { User } from "../interfaces/user";
import * as utils from "../utilities/utils"

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.passwordConfirm) {
            return res.status(401).send({success: false, message: "Fill out all fields!"});
        }

        if (!utils.IsValidEmail(req.body.email)) {
            return res.status(401).send({ success: false, message: "Enter a valid E-mail!" });
        }

        if (!utils.IsValidPassword(req.body.password)) {
            return res.status(401).send({success: false, message: "Password is not strong enough!"});
        }

        if (!utils.IsMatching(req.body.password, req.body.passwordConfirm)) {
            return res.status(401).send({success: false, message: "Passwords need to match!"});
        }

        service.findUserByEmail(req.body.email, (user: User) => {
            if (user) {
                return res.status(401).send({success: false, message: "E-mail is already taken!"});
            }

            service.register(req.body.email, req.body.password, (user: User) => {
                res.status(201).send({success: true, message: "Registration successful!", user});
            });
        });
    }
    catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(401).send({success: false, message: "Fill out all fields!"});
        }

        service.login(req.body.email, req.body.password, (token: string) => {
            if (!token) {
                return res.status(401).send({success: false, message: "Invalid credentials!"});
            }

            res.status(200).send({success: true, message: "Login successful!", token});
        });
    }
    catch (err) {
        next(err);
    }
};