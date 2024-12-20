const slSteams: string[][] = [
	[
		`                      (@@) (  ) (@)  ( )  @@    ()    @     O     @     O      @`,
		`                 (   )`,
		`             (@@@@)`,
		`          (    )`,
		``,
		`          (@@@)`,
	],
	[
		`                      (  ) (@@) ( )  (@)  ()    @@    O     @     O     @      O`,
		`                 (@@@)`,
		`             (    )`,
		`          (@@@@)`,
		``,
		`        (   )`,
	],
];

// prettier-ignore
const slBody: string[] = [
	`      ====        ________                ___________ `,
	`  _D _|  |_______/        \\__I_I_____===__|_________| `,
	`   |(_)---  |   H\\________/ |   |        =|___ ___|      _________________         `,
	`   /     |  |   H  |  |     |   |         ||_| |_||     _|                \\_____A  `,
	`  |      |  |   H  |__--------------------| [___] |   =|                        |  `,
	`  | ________|___H__/__|_____/[][]~\\_______|       |   -|                        |  `,
	`  |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_ `,
];

const slWheels: string[][] = [
	[
		`__/ =| o |=-O=====O=====O=====O \\ ____Y___________|__|__________________________|_ `,
		` |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|   `,
		`   \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/   `,
	],
	[
		`__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_ `,
		` |/-=|___|=O=====O=====O=====O   |_____/~\\___/          |_D__D__D_|  |_D__D__D_|   `,
		`  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/    `,
	],
	[
		`__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_ `,
		` |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|   `,
		`  \\_/      \\O=====O=====O=====O_/      \\_/               \\_/   \\_/    \\_/   \\_/    `,
	],
	[
		`__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_ `,
		` |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|   `,
		`  \\_/      \\_O=====O=====O=====O/      \\_/               \\_/   \\_/    \\_/   \\_/    `,
	],
	[
		`__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_ `,
		` |/-=|___|=   O=====O=====O=====O|_____/~\\___/          |_D__D__D_|  |_D__D__D_|   `,
		`  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/    `,
	],
	[
		`__/ =| o |=-~O=====O=====O=====O\\ ____Y___________|__|__________________________|_ `,
		` |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|   `,
		`  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/    `,
	],
];

const slBody_add_help = (count: number) => {
	const tmp = slBody;

	if (count % 4 == 0) {
		tmp[3] = tmp[3].replace("|_| |_|", "(o) (o)");
		return tmp;
	} else if (count % 4 == 1) {
		tmp[2] = tmp[2].replace("___ ___| ", "Help__|  ");
		tmp[3] = tmp[3].replace("|_| |_|", `\\o/ \\o/`);
		return tmp;
	} else if (count % 4 == 2) {
		tmp[2] = tmp[2].replace("___ ___| ", "HelpHelp!");
		tmp[3] = tmp[3].replace("|_| |_|", "(o) (o)");
		return tmp;
	} else if (count % 4 == 3) {
		tmp[2] = tmp[2].replace("___ ___| ", "___ Help!");
		tmp[3] = tmp[3].replace("|_| |_|", `\\o/ \\o/`);
		return tmp;
	}
};

export const sl = (args: string[], h: number, w: number) => {
	const animation = [];
	animation.push(`\x1b[?25l` + "\n".repeat(h)); //カーソルを非表示し1ページ分改行
	for (let time = 0; time < w + 83; time++) {
		animation.push(`\x1b[1;1H`); //カーソルを左上(1,1)に移動
		let tmp = "";

		for (let i = 0; i < 6; i++) {
			tmp +=
				(" ".repeat(w) + slSteams[time % 2][i] + " ".repeat(w)).slice(
					time,
					time + w - 1,
				) + "\n";
		}

		for (let i = 0; i < 7; i++) {
			tmp +=
				(" ".repeat(w) + slBody[i] + " ".repeat(w)).slice(time, time + w - 1) +
				"\n";
		}

		for (let i = 0; i < 3; i++) {
			tmp +=
				(" ".repeat(w) + slWheels[time % 6][i] + " ".repeat(w)).slice(
					time,
					time + w - 1,
				) + "\n";
		}

		animation.push(tmp);
	}

	animation.push(`\x1b[?25h\x1b[1;1H`); //カーソルを表示し、カーソルを左上(1,1)に移動

	return animation;
};
