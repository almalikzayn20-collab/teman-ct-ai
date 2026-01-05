import { ctGenerateAgent } from "./ctGenerate";
import { ctStoryAgent } from "./ctStory";
import { jagoYTAgent } from "./jagoYT";
import { ugcAgent } from "./ugc";


export async function agentRouter({ agent, payload }) {
switch (agent) {
case "ct-generate":
return ctGenerateAgent(payload);
case "ct-story":
return ctStoryAgent(payload);
case "jago-yt":
return jagoYTAgent(payload);
case "ugc":
return ugcAgent(payload);
default:
throw new Error("Unknown agent");
}
}