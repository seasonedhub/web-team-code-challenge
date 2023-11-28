/// <reference types="vitest" />

import { defineConfig } from "vite"

export default defineConfig({
    test: {
        include: ['./test/*.ts'],
        exclude: ["**/test/type-level/*.ts", "**/test/helpers/*", "**/test/fixtures/*"],
        globals: true,
        typecheck: {
            checker: "tsc"
        }
    }
})