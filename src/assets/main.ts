import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import { Unicode11Addon } from "xterm-addon-unicode11";
import { ImageAddon } from "xterm-addon-image";
import { Readline } from "xterm-readline";
import { my_eval } from "../pages/cui/modules/my_eval";

import "xterm/css/xterm.css";
import "./style.css";

const term = new Terminal({
	// fontSize: 12,
	cursorBlink: true,
	allowProposedApi: true,
	fontFamily: "Source Code Pro",
	theme: {
		background: "black",
		foreground: "white",
	},
});

const fitaddon = new FitAddon();
const webLinkAddon = new WebLinksAddon();
const unicode11Addon = new Unicode11Addon();
const imageAddon = new ImageAddon();
const rl = new Readline();

term.open(document.getElementById("app") as HTMLElement);

[fitaddon, webLinkAddon, unicode11Addon, imageAddon, rl].map((e) => term.loadAddon(e));

term.focus();
fitaddon.activate(term);
webLinkAddon.activate(term);
unicode11Addon.activate(term);
imageAddon.activate(term);

term.unicode.activeVersion = "11";

fitaddon.fit();
window.addEventListener("resize", () => fitaddon.fit());

function readLine() {
	rl.read("\n$ ").then(processLine);
}

async function processLine(text: string) {
	const res = await my_eval(text);
	console.log(res);
	rl.println(res);
	readLine();
}
rl.println("welcome to");
rl.println(`
██╗   ██╗███╗   ███╗ █████╗ ███╗   ███╗██╗
██║   ██║████╗ ████║██╔══██╗████╗ ████║██║
██║   ██║██╔████╔██║███████║██╔████╔██║██║
██║   ██║██║╚██╔╝██║██╔══██║██║╚██╔╝██║██║
╚██████╔╝██║ ╚═╝ ██║██║  ██║██║ ╚═╝ ██║██║
 ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝

 ██████╗██╗   ██╗██╗                      
██╔════╝██║   ██║██║                      
██║     ██║   ██║██║                      
██║     ██║   ██║██║                      
╚██████╗╚██████╔╝██║                      
 ╚═════╝ ╚═════╝ ╚═╝    ver 1.0.1

please, type "help" to display available commands.`);

readLine();
