const i18nStringsFiles = require("i18n-strings-files");
const fs = require("fs");
const path = require("path");

// const directoryPath = path.join(__dirname, "/public/vi.lproj");
const directoryPath = process.argv[2];

const regexTypeIsString = /.*\.strings$/;

fs.readdir(directoryPath, async (err, files) => {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  let fileArr = [];

  try {
    //listing all files using forEach
    files.forEach(function(file) {
      const testCorrectType = regexTypeIsString.test(file);
      if (testCorrectType) {
        fileArr.push(file);
      }
    });

    if (fileArr.length > 0) {
      const uyt = await fetchResult(fileArr);

      await fs.writeFile(
        __dirname + `/models/${process.argv[3]}.json`,
        JSON.stringify(uyt),
        "utf8",
        (err, data) => {
          if (!err) {
            console.log("Done!");
          }
        }
      );
    }
  } catch (e) {
    console.log(e);
  }
});

const fetchResult = async fileArr => {
  let final = {};

  await fileArr.map(async fileName => {
    const data = await i18nStringsFiles.readFileSync(
      `${directoryPath}/${fileName}`,
      "UTF-8"
    );
    const nameOfFile = fileName.substring(0, fileName.length - 8);

    await Object.keys(data).forEach(async key => {
      const newkey = nameOfFile + "." + key;
      final[newkey] = await data[key];
      // delete data[key];
    });
  });

  return final;
};
