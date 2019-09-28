const fs = require("fs");
const fetchResult = require("./libs/result")

const regexTypeIsString = /.*\.strings$/;
const regexTypeIsFolder = /.*\.lproj$/;

const getDirectories = source =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

let folderArr = getDirectories(process.argv[2]);
folderArr = folderArr.filter(f => regexTypeIsFolder.test(f));

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
              console.log(`Done ${i}!`);
            }
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  });
});
