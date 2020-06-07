import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

const sendAuthFail = (res: any) => {
	res.status(401).json({
		error: {
			message: "Authorization failed",
			status: 401,
		},
	});
};

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const key = req.headers.authorization!.split(" ")[1];
		if (await bcrypt.compare(key, process.env.HASHED_API_KEY!)) {
			next();
		} else {
			sendAuthFail(res);
		}
	} catch (err) {
		sendAuthFail(res);
	}
};
