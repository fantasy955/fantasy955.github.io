 [16. Modules (exploringjs.com)](https://exploringjs.com/es6/ch_modules.html#sec_importing-exporting-details)

export：规定模块对外接口
①默认导出：export default Test(导入时可指定模块任意名称，无需知晓内部真实名称)

②单独导出：export const name = "Bruce"

③按需导出：export { age, name, sex }(推荐)

④改名导出：export { name as newName }

import：导入模块内部功能
①默认导入：import Test from "test"

②整体导入：import * as Test from "test"

③按需导入：import { age, name, sex } from "test"

④改名导入：import { name as newName } from "test"

⑥自执导入（Empty import）：import "test"

⑦复合导入：import Test, { name } from "test"

复合模式
export命令和import命令结合在一起写成一行，变量实质没有被导入当前模块，相当于对外转发接口，导致当前模块无法直接使用其导入变量

①默认导入导出：export { default } from "test"

②整体导入导出：export * from "test"

③按需导入导出：export { age, name, sex } from "test"

④改名导入导出：export { name as newName } from "test"

⑤具名改默认导入导出：export { name as default } from "test"

⑥默认改具名导入导出：export { default as name } from "test"

继承：默认导出和改名导出结合使用可使模块具备继承性;

设计思想：尽量地静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量;

严格模式：ES6模块自动采用严格模式.