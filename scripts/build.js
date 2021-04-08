const { spawnSync } = require("child_process")
const npmrunpath = require("npm-run-path")



spawnSync(
    "tsc",
    [
        "--build",
        ...process.argv.slice(2)
    ],
    {
        cwd: process.cwd(),
        shell: true,
        stdio: "inherit",
        env: npmrunpath.env()
    }
)

spawnSync(
    "grpc_tools_node_protoc",
    [
        "--proto_path=./",
        "--js_out=import_style=commonjs,binary:./",
        "--grpc_out=grpc_js:./",
        "./schema/schema.proto",
        "--ts_out=./",
        ...process.argv.slice(2)
    ],
    {
        cwd: process.cwd(),
        shell: true,
        stdio: "inherit",
        env: npmrunpath.env()
    }
)