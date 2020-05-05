const fs = require('fs');
const path = require('path');
const readdirp = require('readdirp');

module.exports = {
  onPostBuild: async ({ constants: { PUBLISH_DIR }, inputs, utils }) => {
    const fileTypeLength = inputs.fileType.length;
    let files = [];

    if (inputs.fileType == '') return console.log('🤦🏻‍♀️ Oops, need a file type.');

    console.log(`🚮 Removing all the ${inputs.fileType} files.`);

    for await (const entry of readdirp(PUBLISH_DIR, {
      fileFilter: `*.${inputs.fileType}`,
    })) {
      files.push(entry.path);
    }

    files
      .filter((file) => file.slice(-fileTypeLength) == inputs.fileType)
      .forEach((file) => {
        fs.unlinkSync(`${PUBLISH_DIR}/${file}`, (error) => {
          if (error) utils.build.failPlugin('unlinkSync error:', error);
        });
        console.log(`${file} has been deleted 💣`);
      });
  },
};
