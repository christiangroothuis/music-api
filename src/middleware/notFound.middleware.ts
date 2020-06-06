import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const status = 404;
	const message = "Resource not found";

	response.status(status).json({
		status,
		message,
	});
};
