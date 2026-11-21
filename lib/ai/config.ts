// AI Agent Registry
// Add agents here as you build them out.
// Each agent defines its model, provider, and API method.
//
// apiMethod:
//   "ai-sdk"  — Vercel AI SDK (streaming, for chat interfaces)
//   "direct"  — Direct API call (batch processing, non-streaming)
//
// Current Claude models (Opus 5.5, Sonnet 5.5, Haiku 5.5, Fable 5.2) reject
// `temperature`, may think before answering out of the same `max_tokens`,
// and reject forced tool calls. Send no temperature, set `effort` explicitly
// and leave room in `max_tokens`.

export type AgentConfig = {
  model: string
  provider: "anthropic" | "openai" | "perplexity"
  apiMethod: "ai-sdk" | "direct"
  description?: string
}

export const agents: Record<string, AgentConfig> = {
  // Example:
  // "my-agent": {
  //   model: "claude-sonnet-5-5",
  //   provider: "anthropic",
  //   apiMethod: "ai-sdk",
  //   description: "What this agent does",
  // },
}

export function getAgent(name: string): AgentConfig {
  const agent = agents[name]
  if (!agent) {
    throw new Error(`Agent "${name}" is not registered in lib/ai/config.ts`)
  }
  return agent
}
