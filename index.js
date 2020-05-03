const fs = require('fs');
const glob = require('glob');
const path = require('path');

module.exports = {
  onPostBuild: ({ constants: { PUBLISH_DIR }, utils }) => {
    console.log('🚮 Removing all the JS files.');

    const files = fs
      .readdirSync(PUBLISH_DIR)
      .filter((file) => file.slice(-2) == 'js');

    files.forEach((file) => {
      fs.unlinkSync(`${PUBLISH_DIR}/${file}`, (error) => {
        if (error) utils.build.failPlugin('unlinkSync error:', error);
      });
      console.log(`${file} has been deleted 💣`);
    });

    const builtPages = glob.sync(`${PUBLISH_DIR}/*`);
    console.log(builtPages);
  },
};
