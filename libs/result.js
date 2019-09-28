const i18nStringsFiles = require("i18n-strings-files");

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

module.exports = fetchResult;
