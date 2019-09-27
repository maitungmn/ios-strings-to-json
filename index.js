const i18nStringsFiles = require("i18n-strings-files");
const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "/public/vi.lproj");

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
      const fetchResult = async () => {
        let final = {};

        await fileArr.map(async fileName => {
          console.log(3);
          const data = await i18nStringsFiles.readFile(
            __dirname + "/public/vi.lproj/" + fileName,
            "UTF-8"
          );
          console.log(data)
          console.log(4);
          const nameOfFile = fileName.substring(0, fileName.length - 8);

          console.log(5)

          await Object.keys(data).forEach(async key => {
            console.log(6)
            const newkey = nameOfFile + "." + key;
            console.log(7)
            final[newkey] = await data[key];
            // delete data[key];

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
          });
        });

        console.log(final)
        return Promise.resolve(final);
      };
      console.log(2);
      const uyt = await fetchResult();
      console.log(8);
      console.log(uyt);
      // fetchResult()
      //   .then(result => console.log(result))
      //   .catch(e => console.log(e));
    }
  } catch (e) {
    console.log(e);
  }
});
