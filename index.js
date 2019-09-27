const i18nStringsFiles = require("i18n-strings-files");
const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "/public/vi.lproj");

const regexTypeIsString = /.*\.strings$/;

let fileArr = [];

fs.readdir(directoryPath, (err, files) => {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function(file) {
    const testCorrectType = regexTypeIsString.test(file);
    if (testCorrectType) {
      fileArr.push(file);
    }
  });

  if (fileArr.length > 0) {
    let final = {};
    fileArr.map(fileName => {
      i18nStringsFiles.readFile(
        __dirname + "/public/vi.lproj/" + fileName,
        "UTF-8",
        function(err, data) {
          const nameOfFile = fileName.substring(0, fileName.length - 8);

          Object.keys(data).forEach(key => {
            const newkey = nameOfFile + "." + key;
            final[newkey] = data[key];
            // delete data[key];
          });

          //   console.log(final);

          //   fs.writeFile(
          //     __dirname + "/models/vi.json",
          //     JSON.stringify(final),
          //     "utf8",
          //     (err, data) => {
          //       if (!err) {
          //         console.log("Done!");
          //       }
          //     }
          //   );
        }
      );
    });
  }
});
