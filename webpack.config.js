const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const entries = {};
const html_files = [];
["js", "jsx"].forEach((ext) => {
  glob.sync(`./src/pages/**/*.${ext}`).forEach((entry) => {
    let name = entry.substring("./src/pages/".length).replace("/", ".");
    name = name.substring(0, name.length - ext.length - 1);
    entries[name] = path.join(__dirname, entry);
    html_files.push(
      new HtmlWebpackPlugin({
        chunks: [name],
        filename: `${name}.html`,
        template: "./src/index.html",
      })
    );
  });
});

const jsx_setup = {
  runtime: "classic",
  pragma: "dom",
  pragmaFrag: "dom.Fragment",
  useSpread: true,
};

module.exports = (env, { mode }) => {
  options = {};
  if (mode !== "production") {
    options = { devtool: "inline-source-map" };
  }
  return {
    mode: mode,
    entry: entries,
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      historyApiFallback: true,
      port: 9090,
    },
    ...options,
    plugins: [
      new CleanWebpackPlugin(),
      ...html_files,
      new CopyWebpackPlugin({
        patterns: [
          {
            context: "node_modules/@webcomponents/webcomponentsjs",
            from: "*.js",
            to: "webcomponents",
          },
          {
            context: "node_modules/@webcomponents/webcomponentsjs",
            from: "bundles/*.js",
            to: "webcomponents",
          },
          {
            context: "src/assets",
            from: "*",
            to: "./",
          },
        ],
      }),
    ],
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          use: ["html-loader"],
        },
        {
          test: /\.tsx?$/,
          use: ["ts-loader"],
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                ["@babel/plugin-transform-react-jsx", jsx_setup],
                ["@babel/plugin-transform-react-jsx-self", jsx_setup],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
              options: { esModule: true },
            },
            "css-loader",
          ],
        },
        {
          test: /\.s[a|c]ss$/,
          use: [
            {
              loader: "style-loader",
              options: { esModule: true },
            },
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|gif|jpg|cur)$/i,
          use: [{ loader: "url-loader", options: { limit: 8192 } }],
        },
        {
          test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          use: [
            {
              loader: "url-loader",
              options: { limit: 10000, mimetype: "application/font-woff2" },
            },
          ],
        },
        {
          test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          use: [
            {
              loader: "url-loader",
              options: { limit: 10000, mimetype: "application/font-woff" },
            },
          ],
        },
        {
          test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          loader: "file-loader",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss", "css"],
      modules: ["node_modules", "src"],
    },
    optimization: {
      minimize: mode === "production" ? true : false,
    },
  };
};
