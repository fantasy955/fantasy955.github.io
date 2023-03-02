
class MyTestPlugin {
    constructor(options) {
        this.options = options;
        this.i = 0;
        this.a = 0;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('MyTestPlugin', async (compilation, compilationParams) => {
            console.log(`\n${this.i++}`);
            compilation.hooks.buildModule.tap('MyTestPlugin', (module) => {
                // 一个compilation有多个module
                // console.log(`\n${this.a++}`);
            })
        })
    }
}

module.exports = { MyTestPlugin }