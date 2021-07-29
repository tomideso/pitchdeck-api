module.exports = {
  apps: [
    {
      name: "wefunder",
      script: "dist/index.js",
      node_args: "-r dotenv/config",
    },
  ],
};
