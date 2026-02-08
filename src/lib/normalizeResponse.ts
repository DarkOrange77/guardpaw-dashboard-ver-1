/**
 * Deeply extracts readable text from n8n webhook responses.
 * Handles JSON Schema-like structures where fields are { type: "string", description: "..." }
 * as well as nested wrappers like { properties: { ... } }, { output: { ... } }, etc.
 */

// Extract text from any value — handles objects with `description`, nested objects, strings, etc.
function extractText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (!value || typeof value !== "object") return "";

  const obj = value as Record<string, unknown>;

  // If it has a "description" key, use that (JSON Schema pattern from n8n)
  if (typeof obj.description === "string") return obj.description;

  // If it has a "value" key, use that
  if (typeof obj.value === "string") return obj.value;

  // If it has a "text" key, use that
  if (typeof obj.text === "string") return obj.text;

  // If it has a "content" key, use that
  if (typeof obj.content === "string") return obj.content;

  // Last resort: try to stringify meaningfully
  return "";
}

// Unwrap the response to find the actual data object
function unwrap(data: unknown): Record<string, unknown> {
  if (!data || typeof data !== "object") return {};

  const obj = data as Record<string, unknown>;

  // If it directly has our expected keys, use it as-is
  if ("risk_level" in obj || "red_flags" in obj || "recommendation" in obj) {
    return obj;
  }

  // Try common wrapper patterns: properties, output, data, result, response
  for (const key of ["properties", "output", "data", "result", "response", "body"]) {
    if (obj[key] && typeof obj[key] === "object") {
      const nested = obj[key] as Record<string, unknown>;
      if ("risk_level" in nested || "red_flags" in nested || "recommendation" in nested) {
        return nested;
      }
      // Go one level deeper (e.g. { output: { properties: { ... } } })
      for (const innerKey of ["properties", "output", "data"]) {
        if (nested[innerKey] && typeof nested[innerKey] === "object") {
          const deep = nested[innerKey] as Record<string, unknown>;
          if ("risk_level" in deep || "red_flags" in deep || "recommendation" in deep) {
            return deep;
          }
        }
      }
    }
  }

  // If nothing matched, return the original
  return obj;
}

export function normalizeResponse(raw: unknown): {
  risk_level: string;
  red_flags: string[];
  matched_patterns: string[];
  recommendation: string;
} {
  const data = unwrap(raw);

  console.log("Unwrapped data keys:", Object.keys(data));
  console.log("risk_level raw:", JSON.stringify(data.risk_level));
  console.log("red_flags raw:", JSON.stringify(data.red_flags));
  console.log("matched_patterns raw:", JSON.stringify(data.matched_patterns));
  console.log("recommendation raw:", JSON.stringify(data.recommendation));

  const riskLevel = extractText(data.risk_level) || "Unknown";

  // Parse arrays — could be actual arrays, comma/newline/bullet-separated strings, or objects with description
  const redFlags = parseToArray(data.red_flags);
  const matchedPatterns = parseToArray(data.matched_patterns);
  const recommendation = extractText(data.recommendation) || "No recommendation provided.";

  return {
    risk_level: riskLevel,
    red_flags: redFlags,
    matched_patterns: matchedPatterns,
    recommendation,
  };
}

function parseToArray(value: unknown): string[] {
  if (!value) return [];

  // Already an array
  if (Array.isArray(value)) {
    return value.map(extractText).filter(Boolean);
  }

  // Extract text first (handles { description: "..." } objects)
  const text = extractText(value);
  if (!text) return [];

  // Split by bullet points (•), numbered lists, or newlines
  const items = text
    .split(/(?:\n|(?:^|\n)\s*(?:•|▸|-|\d+\.)\s*)/)
    .map((s) => s.trim())
    .filter(Boolean);

  return items;
}
