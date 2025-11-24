import { Request, NextFunction, Response } from "express";

module.exports = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Error!';

    res.status(status).json({success: false,  message: message });
}