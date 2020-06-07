const bcrypt = require("bcrypt");
const inquirer = require("inquirer");

inquirer
	.prompt([
		{
			name: "secret",
			type: "password",
			message: "Fill in the password to hash",
		},
	])
	.then(async (answers) => {
		const hashedPassword = await bcrypt.hash(answers.secret, 10);

		console.log(hashedPassword);
	})
	.catch((err) => {
		console.log(err);
	});
