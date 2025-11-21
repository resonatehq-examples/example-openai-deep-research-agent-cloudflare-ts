// Resonate HQ
import { Resonate } from "@resonatehq/cloudflare";
import OpenAI from "openai";
import { research } from "./agent";

const resonate = new Resonate();

resonate.onInitialize(async (env: Record<string, string>) => {
	const apiKey = env.OPENAI_API_KEY;
	if (!apiKey) {
		throw new Error("Missing required environment variable: OPENAI_API_KEY");
	}

	resonate.setDependency("aiclient", new OpenAI({ apiKey }));
});

resonate.register("research", research);

export default resonate.handlerHttp();
