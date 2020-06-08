import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
	error: HttpException,
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const status = error.status || 500;
	const message = error.message || "Server error";

	response.status(status).json({
		error: {
			status,
			message,
		},
	});
};
