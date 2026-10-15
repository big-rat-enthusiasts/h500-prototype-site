import prettier from "eslint-config-prettier";
import path from "node:path";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import { defineConfig, includeIgnoreFile } from "eslint/config";
import globals from "globals";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

export default defineConfig([
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    svelte.configs.recommended,
    prettier,
    svelte.configs.prettier,
    {
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },

    {
        files: ["**/*.svelte", "**/*.svelte.js"],
        languageOptions: { parserOptions: {} },
    },

    {
        rules: {
            "capitalized-comments": "off",
            "func-style": "off",
            "id-length": [
                "error",
                {
                    exceptions: ["_"],
                },
            ],
            "max-lines-per-function": "off",
            "no-alert": "warn",
            "no-console": "off",
            "no-magic-numbers": [
                "warn",
                {
                    ignore: [0],
                    ignoreDefaultValues: true,
                },
            ],
            "no-ternary": "off",
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],
            "no-warning-comments": "warn",
            "one-var": "off",
            "sort-imports": "off",
            "sort-keys": "off",
        },
    },
]);
