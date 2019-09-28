const fs = require("fs");
const fetchResult = require("./libs/result");

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
      const uyt = await fetchResult(fileArr, directoryPath);

      await fs.writeFile(
        `${process.argv[3]}/${process.argv[4]}.json`,
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
