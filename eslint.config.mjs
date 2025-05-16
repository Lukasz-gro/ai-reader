import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const config = [
    ...compat.extends(
        "next/core-web-vitals",
        "next",
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended"
    ),
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json"
            }
        }
    },
    {
        rules: {
            "@/semi": ["error", "always"],
            "@/indent": ["error", 4, { SwitchCase: 1 }],
        }
    },
    {
        ignores: [
            "**/node_modules/**",
            ".next/**"
        ]
    }
];

export default config;
