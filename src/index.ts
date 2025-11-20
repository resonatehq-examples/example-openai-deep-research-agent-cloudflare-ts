// Resonate HQ
import { Resonate } from "@resonatehq/cloudflare";
import OpenAI from "openai";
import { research } from "./agent";

const resonate = new Resonate();

resonate.register("research", research);

// This is required for Cloudflare Workers, because the only way to access
// env variables is from the env argument passed to the handler, so we are
// required to wrap it and set dependencies.
export default {
	async fetch(
		request: Request,
		env: Record<string, string>,
		ctx: any,
	): Promise<Response> {
		const apiKey = env.OPENAI_API_KEY;
		if (!apiKey) {
			throw new Error("Missing required environment variable: OPENAI_API_KEY");
		}

		resonate.setDependency("aiclient", new OpenAI({ apiKey }));

		return resonate.handlerHttp().fetch(request, env, ctx);
	},
};
