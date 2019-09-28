const i18nStringsFiles = require("i18n-strings-files");
const fs = require("fs");

// const directoryPath = process.argv[2];

const regexTypeIsString = /.*\.strings$/;
const regexTypeIsFolder = /.*\.lproj$/;

const getDirectories = source =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

let folderArr = getDirectories(process.argv[2]);
folderArr = folderArr.filter(f => regexTypeIsFolder.test(f));
console.log(folderArr);

folderArr.map(i => {
  const directoryPath = `${process.argv[2]}/${i}`;

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
        const uyt = await fetchResult(fileArr, directoryPath);

        await fs.writeFile(
          `${process.argv[3]}/${i.substring(0, i.length - 6)}.json`,
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
});

const fetchResult = async (fileArr, directoryPath) => {
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
