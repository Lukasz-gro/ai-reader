import js from "@eslint/js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const config = [
    {
        settings: {
            react: {version: 'detect'}
        },
    },
    js.configs.recommended,
    ...compat.extends(
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript"
    ),
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true
                },
                project: "./tsconfig.json"
            }
        },
        settings: {
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true
                }
            }
        },
        rules: {
            "semi": ["error", "always"],
            "indent": ["error", 4, { SwitchCase: 1 }],
            "quotes": ["error", "single", { "avoidEscape": true }],
            "jsx-quotes": ["error", "prefer-single"],
            "eol-last": ["error", "always"],
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off"
        }
    },
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/build/**",
            "**/.vite/**",
            "postcss.config.js",
            "tailwind.config.js",
            "vitest.config.mts"
        ]
    }
];

export default config;
