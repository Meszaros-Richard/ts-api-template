import { db } from "../config/database";
import uuid from "uuid";
import { User } from "../interfaces/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config"

export const register = async (email: string, password: string, cb: Function) => {
    const user: User = {
        id: uuid.v4(),
        email: email,
        password: await bcrypt.hash(password, 10)
    }

    db.query(`INSERT INTO users VALUES (?, ?, ?)`, [user.id, user.email, user.password], (err, res) => {
        if (err) {
            throw new Error("Registration error: " + err);
        }

        cb(user);
    });
};

export const login = async (email: string, password: string, cb: Function) => {
    await findUserByEmail(email, async (user: User) => {
        if (!user) return cb();

        if (!await bcrypt.compare(password, user.password)) return cb();

        cb(jwt.sign(user, config.jwtSecret, {expiresIn: "1h"}));
    })
};

export const findUserByEmail = async (email: string, cb: Function) => {
    db.query(`SELECT * FROM users WHERE email = ?`, [email], (err, res) => {
        if (err) {
            throw new Error("Find user error: " + err);
        }

        cb((res as User[])[0]);
    });
};