/** @type {import("prettier").Config} */
const config = {
    useTabs: false,
    tabWidth: 4,
    singleQuote: false,
    trailingComma: "es5",
    printWidth: 100,
    semi: true,
    bracketSameLine: false,
    arrowParens: "avoid",
    plugins: ["prettier-plugin-svelte"],
    overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};

export default config;
