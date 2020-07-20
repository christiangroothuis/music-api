import { Request, Response, NextFunction } from "express";

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

		if (process.env.API_KEY! === key) {
			next();
		} else {
			sendAuthFail(res);
		}
	} catch (err) {
		sendAuthFail(res);
	}
};
