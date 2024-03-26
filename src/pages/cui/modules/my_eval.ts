import { bio } from "./bio";
import { hello } from "./hello";
import { help } from "./help";
import { fetchPokemonImage } from "./poke";

export async function my_eval(prompt: string) {
	if (prompt.replace(/ /g, "") == "") {
		return "";
	}

	const [command, ...args] = prompt.split(" ");
	switch (command) {
		case "hello":
			return hello(args);
		case "poke":
			return await fetchPokemonImage(args[0]);
		case "help":
			return help(args);
		case "bio":
			window.open("https://twitter.com/umamichang_dev");
			return bio(args);
		default:
			return `Your input is: ${prompt}.
Could not find command "${command}".`;
	}
}
