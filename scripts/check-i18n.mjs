import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localesDirectory = path.join(root, "src", "i18n", "locales");
const sourceDirectory = path.join(root, "src");
const languages = ["es", "en", "it"];
const sourceLanguage = "es";

const errors = [];
const warnings = [];

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function flattenKeys(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (child && typeof child === "object" && !Array.isArray(child)) {
      return flattenKeys(child, fullKey);
    }

    return [{ key: fullKey, value: child }];
  });
}

function getTokens(value, pattern) {
  return [...value.matchAll(pattern)]
    .map((match) => match[1])
    .sort();
}

function arraysEqual(left, right) {
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

function walkFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = path.join(directory, entry);

    if (statSync(fullPath).isDirectory()) {
      return walkFiles(fullPath);
    }

    return /\.(ts|tsx)$/.test(entry) ? [fullPath] : [];
  });
}

const translations = Object.fromEntries(
  languages.map((language) => [
    language,
    readJson(path.join(localesDirectory, `${language}.json`)),
  ]),
);

const sourceEntries = new Map(
  flattenKeys(translations[sourceLanguage]).map(({ key, value }) => [
    key,
    value,
  ]),
);

for (const language of languages) {
  if (language === sourceLanguage) continue;

  const entries = new Map(
    flattenKeys(translations[language]).map(({ key, value }) => [key, value]),
  );

  for (const key of sourceEntries.keys()) {
    if (!entries.has(key)) {
      errors.push(`[${language}] Missing key: ${key}`);
    }
  }

  for (const key of entries.keys()) {
    if (!sourceEntries.has(key)) {
      errors.push(`[${language}] Extra key: ${key}`);
    }
  }

  for (const [key, value] of entries) {
    const sourceValue = sourceEntries.get(key);

    if (typeof value !== "string" || !value.trim()) {
      errors.push(`[${language}] Empty value: ${key}`);
      continue;
    }

    if (typeof sourceValue !== "string") continue;

    const sourcePlaceholders = getTokens(
      sourceValue,
      /\{\{\s*([\w.]+)\s*\}\}/g,
    );
    const targetPlaceholders = getTokens(value, /\{\{\s*([\w.]+)\s*\}\}/g);

    if (!arraysEqual(sourcePlaceholders, targetPlaceholders)) {
      errors.push(
        `[${language}] Placeholder mismatch: ${key} (${sourcePlaceholders.join(
          ", ",
        )} vs ${targetPlaceholders.join(", ")})`,
      );
    }

    const sourceTags = [
      ...new Set(getTokens(sourceValue, /<\/?([a-zA-Z][\w-]*)\b[^>]*>/g)),
    ].sort();
    const targetTags = [
      ...new Set(getTokens(value, /<\/?([a-zA-Z][\w-]*)\b[^>]*>/g)),
    ].sort();

    if (!arraysEqual(sourceTags, targetTags)) {
      errors.push(
        `[${language}] Markup mismatch: ${key} (${sourceTags.join(
          ", ",
        )} vs ${targetTags.join(", ")})`,
      );
    }
  }
}

const sourceFiles = walkFiles(sourceDirectory).filter(
  (filePath) => !filePath.includes(`${path.sep}i18n${path.sep}`),
);

const literalKeyPattern = /\bt\(\s*(["'`])([^"'`$]+)\1\s*[,)]/g;
const i18nKeyPattern = /i18nKey=(["'])([^"'$]+)\1/g;
const staticAttributePattern = /\b(aria-label|placeholder|title|alt)="([^"]*)"/g;

for (const filePath of sourceFiles) {
  const content = readFileSync(filePath, "utf8");
  const relativePath = path.relative(root, filePath);

  for (const pattern of [literalKeyPattern, i18nKeyPattern]) {
    for (const match of content.matchAll(pattern)) {
      const key = match[2];

      if (!sourceEntries.has(key)) {
        errors.push(`[${relativePath}] Translation key not found: ${key}`);
      }
    }
  }

  for (const match of content.matchAll(staticAttributePattern)) {
    if (!match[2].trim()) continue;

    errors.push(
      `[${relativePath}] Hardcoded ${match[1]} attribute: "${match[2]}"`,
    );
  }
}

const allowedJsxText = new Set([
  "tuchi",
  "digital",
  "hola@tuchidigital.com",
  "→",
  "✓",
]);

const jsxTextPattern = /(?<![=])>\s*([A-Za-zÁÉÍÓÚÜÑáéíóúüñ][^<>{}]*?)\s*</g;

for (const filePath of sourceFiles) {
  const content = readFileSync(filePath, "utf8");
  const contentWithoutComments = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  const relativePath = path.relative(root, filePath);

  for (const match of contentWithoutComments.matchAll(jsxTextPattern)) {
    const text = match[1].replace(/\s+/g, " ").trim();

    if (!text || /[();=]|=>|return /.test(text)) continue;

    if (!allowedJsxText.has(text) && !text.includes("tuchi")) {
      warnings.push(`[${relativePath}] Review possible hardcoded text: "${text}"`);
    }
  }
}

if (warnings.length) {
  console.warn("Review warnings:");
  for (const warning of warnings) console.warn(`  - ${warning}`);
}

if (errors.length) {
  console.error(`i18n check failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `i18n check passed: ${sourceEntries.size} keys in ${languages.length} languages, ${sourceFiles.length} source files scanned.`,
  );
  if (warnings.length) {
    console.log(`${warnings.length} item(s) flagged for manual review.`);
  }
}
