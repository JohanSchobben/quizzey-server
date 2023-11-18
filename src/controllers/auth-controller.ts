import {Request, Response} from "express";
import {database} from "../data/db";
import {User} from "../models/user";
import {compare, hash} from "../utils/hash";
import {createToken} from "../utils/jwt";
import {createUser, selectAllUsers} from "../data/user";

export async function register(req: Request, res: Response): Promise<void> {
    const {
        username,
        password,
        email
    } = req.body;

    const hashedPassword = await hash(password);
    await createUser({
        username,
        email,
        password: hashedPassword
    });

    res.status(201).json({
        message: "user created"
    });
}

export async function login(req: Request, res: Response): Promise<void> {
    const user = await database<User>("users").where("username", req.body.username).first();
    if (!user) {
        res.status(401).json({
            message: "user with given username not found"
        });
        return;
    }

    const passwordsEqual = await compare(req.body.password, user.password);
    if (passwordsEqual) {
        const token = await createToken(user.id, user.username);
        res.status(200).json({
            token,
            message: "User is logged in",
        });
        return;
    }

    res.status(401).json({
        message: "username or password incorrect"
    });
}

export async function getAllUsers(req: Request, res: Response): Promise<void> {
    console.log('hi34');
    const users = await selectAllUsers();
    res.status(200).json({
        users
    });
}

