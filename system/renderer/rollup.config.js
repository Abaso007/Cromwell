import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import autoExternal from "rollup-plugin-auto-external";
import typescript from "rollup-plugin-typescript2";
import packageJson from './package.json';

const external = id => {
    const exts = ['tslib', 'util', 'path'];

    if (id.includes('.cromwell/imports') || id.includes('cromwell/plugins')
        || id.includes('cromwell/themes'))
        return true;

    for (const ext of exts) if (id === ext) return true;

    for (const pack of Object.keys(packageJson.dependencies)) {
        if (id === pack) {
            return true;
        }
    }
}

const buildDir = './build';

export default [
    {
        // preserveModules: true,
        input: "./src/index.ts",
        output: [
            {
                file: `${buildDir}/renderer.js`,
                // dir: './build',
                format: "cjs",
            }
        ],
        external,
        plugins: [
            // autoExternal(),
            resolve({
                preferBuiltins: false
            }),
            commonjs(),
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        module: "ESNext"
                    }
                }
            }),
        ]
    },
    {
        // preserveModules: true,
        input: "./src/generator.ts",
        output: [
            {
                file: `${buildDir}/generator.js`,
                // dir: './build',
                format: "cjs",
            }
        ],
        external,
        plugins: [
            resolve({
                preferBuiltins: false
            }),
            commonjs(),
            typescript({
                tsconfigOverride: {
                    compilerOptions: {
                        module: "ESNext"
                    }
                }
            }),
        ]
    },
];