const glob = require('glob');

module.exports = {
  onPostBuild: ({ constants: { PUBLISH_DIR } }) => {
    console.log('🚮 Removing all the JS files.');

    const jsFiles = glob.sync(`${PUBLISH_DIR}/**/*.js`);
    console.log(jsFiles);
  }
};
