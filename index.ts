import { launchBook } from "../arrmatura-books";
import pkg from "./package.json";

const { author, copyright, description, displayName, hotPort, logo, keywords, name, version } = pkg;

const app = { id: name, name: displayName, logo, version, description, author, keywords, copyright };

const book = {
  indexUrl: "/index.json",
  docUrl: "/docs/*",
  scope: "docs",
};

launchBook({ app, book, hotPort });
