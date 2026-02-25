const { Compilation } = require('webpack');

class RemoveCodeBetweenCommentsPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('RemoveCodeBetweenCommentsPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'RemoveCodeBetweenCommentsPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
        },
        (assets) => {
          for (const assetName in assets) {
            if (Object.prototype.hasOwnProperty.call(assets, assetName)) {
              if (assetName.endsWith('.js') || assetName.endsWith('.tsx')) {  // Only process .js or .tsx files
                const asset = assets[assetName];
                const source = asset.source();
                const updatedSource = this.removeCodeBetweenComments(source);
                compilation.updateAsset(assetName, new compilation.compiler.webpack.sources.RawSource(updatedSource));
              }
            }
          }          
        }
      );
    });
  }

  removeCodeBetweenComments(source) {
    const { startComment, endComment } = this.options;
    const startRegex = new RegExp(`//\\s*${startComment}`, 'g');
    const endRegex = new RegExp(`//\\s*${endComment}`, 'g');

    let inRemoveBlock = false;
    const lines = source.split('\n');
    const updatedLines = lines.filter((line) => {
      if (startRegex.test(line)) {
        inRemoveBlock = true;
        return false;
      }
      if (endRegex.test(line)) {
        inRemoveBlock = false;
        return false;
      }
      return !inRemoveBlock;
    });

    return updatedLines.join('\n');
  }
}

module.exports = RemoveCodeBetweenCommentsPlugin;
