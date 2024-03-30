import { atom } from "recoil";

const urls = atom({
  key: "urls",
  default: [""],
});
const classes = atom({
  key: "classes",
  default: [""],
});
const keys = atom({
  key: "keys",
  default: [""],
});
const types = atom({
  key: "types",
  default: ["string"],
});
const searchTypes = atom({
  key: "searchTypes",
  default: ["single"],
});
export { urls, classes, keys, types, searchTypes };
