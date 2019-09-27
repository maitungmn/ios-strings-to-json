const i18nStringsFiles = require("i18n-strings-files");
const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "/public/vi.lproj");

const regexTypeIsString = /.*\.strings$/;

let fileArr = [];

fs.readdir(directoryPath, function(err, files) {
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
    fileArr.map(fileName => {
      i18nStringsFiles.readFile(
        __dirname + "/public/" + fileName,
        "UTF-8",
        function(err, data) {
          const nameOfFile = fileName.substring(0, fileName.length - 8);
          
          //   console.log(typeof data);
          //   console.log(data);
          fs.writeFile(
            __dirname + "/models/result.json",
            JSON.stringify(data),
            "utf8",
            (err, data) => {
              if (!err) {
                console.log("Done!");
              }
            }
          );
        }
      );
    });
  }
});
