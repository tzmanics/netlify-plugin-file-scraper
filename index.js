const fs = require('fs');
const path = require('path');

module.exports = {
  onPostBuild: ({ constants: { PUBLISH_DIR }, inputs, utils }) => {
    if (inputs.fileType == '') return console.log('🤦🏻‍♀️ Oops, need a file type.');
    console.log(`🚮 Removing all the ${inputs.fileType} files.`);

    const fileTypeLength = inputs.fileType.length;
    const files = fs
      .readdirSync(PUBLISH_DIR)
      .filter((file) => file.slice(-fileTypeLength) == inputs.fileType);

    files.forEach((file) => {
      fs.unlinkSync(`${PUBLISH_DIR}/${file}`, (error) => {
        if (error) utils.build.failPlugin('unlinkSync error:', error);
      });
      console.log(`${file} has been deleted 💣`);
    });
  },
};
