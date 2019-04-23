import fs from "fs";

export const readFileAsync = filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
export const flattenDeep = arr1 => {
  return arr1.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
};

export const locales = [
  {
    code: "id",
    iso: "id-ID",
    name: "Bahasa Indonesia",
    file: "id.js"
  },
  {
    code: "en",
    iso: "en-US",
    name: "English",
    file: "en.js"
  }
];

export const isDev = process.env.NODE_ENV !== "production";
