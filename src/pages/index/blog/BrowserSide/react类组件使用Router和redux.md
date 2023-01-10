## 场景：切换语言

### 使用react-redux的步骤

1. 安装 `react-redux`依赖

2. 在`src/index.tsx`中引入`react-redux`中的`Provider`，`store`; 使用`Provider`，并加载`store`数据仓库

   - `react-redux`使用`react`的`context`上下文，提供一个`Provider API`，包裹 App组件，并加载`store`，提供全局的store

3. 在待使用的组件中使用`react-redux`中的`connect`函数

   - `connect`其实是个 高阶`hoc`，只是它没有使用 withxxx的命名规范

### 具体使用

1. 安装`react-redux`依赖包

   ```bash
   npm i react-redux --save
   npm i @types/react-redux --save-dev
   ```

2. `src/index.tsx`

   ```ts
   import React from 'react'
   import ReactDOM from 'react-dom'
   import { Provider } from 'react-redux' // react-redux 利用上下文context，提供的数据组件Provider
   import 'antd/dist/antd.css'
   import './index.css'
   import App from './App'
   import 'i18n'
   
   import store from 'redux/store'
   
   ReactDOM.render(
     <React.StrictMode>
       {/* 使用Provider， 并加载 数据仓库 store， 就可以在全局范围内使用store */}
       <Provider store={store}>
         <App />
       </Provider>
     </React.StrictMode>,
     document.getElementById('root')
   )
   ```

3. `Header`组件中使用

   ```ts
   import { Component } from 'react'
   import { withRouter, RouteComponentProps } from 'react-router-dom'
   import { MenuInfo } from 'rc-menu/lib/interface'
   import { nanoid } from 'nanoid'
   // 使用react-redux
   import { Dispatch } from 'redux'
   import { connect } from 'react-redux'
   import store, { RootState } from 'redux/store'
   import { addLanguageActionCreator, changeLanguageActionCreator } from 'redux/language/actionCreators'
   
   /* connect 就是一个高阶hoc，只不过它的命名没有使用withxxxx来表示，class 类组件 使用 withxxx 高阶hoc组件
     使用了connect，就相当于store.subscribe， 即组件订阅了store中的数据
   */
   
   
   /* mapStateToProps: 处理数据的流入。返回一个对象
    使用connect函数，传入mapStateToProps，完成store数据与组件的props绑定
    */
   // 高阶hoc包裹的组件，可以获取到一些额外的props或state属性，connect函数传入参数 mapStateToProps， 组件的props会被注入一些额外的props属性
   const mapStateToProps = (state: RootState) => {
     return {
       lng: state.lng,
       languageList: state.languageList
     }
   }
   
   /* mapDispatchToProps: 处理数据的流出。返回一个对象，对象中的每一个字段都是一个dispatch处理函数
      将dispatch绑定到props中
   */
   const mapDispatchToProps = (dispatch: Dispatch) => {
     return {
       addLanguageDispatch: (language: { code: string, language: string }) => {
         dispatch(addLanguageActionCreator(language))
       }
       changeLanguageDispatch: (lng: 'en'|'zh') => {
         dispatch(changeLanguageActionCreator(lng))
       }
     }
   }
   
   class HeaderComponent extends Component<RouteComponentProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>>{
     
     render(){
       const { history, lng, languageList, addLanguageDispatch, changeLanguageDispatch } = this.props
       
       /* meun 的点击事件 */
       const oprateLanguage = ( e: MenuInfo ) => {
         if(e.key !== 'new'){
           changeLanguageDispatch(e.key)
         }else{
          addLanguageDispatch({code: `lng${nanoid()}`, language: '新语种'})
         }
       }
       
       const menu = (
         <Menu>
           <Menu.Item key='new' onClick={oprateLanguage}>
             添加新语言
           </Menu.Item>
           {languageList.map(language => (
             <Menu.Item key={language.code} onClick={oprateLanguage}>
               {language.language}
             </Menu.Item>
           ))}
         </Menu>
       )
       
       return (
         <div>
           <Typography.Text className='mr40'>让旅游更幸福</Typography.Text>
           <Dropdown overlay={menu}>
           	<Button>
           		{languageList.find(language => language.code === lng)?.language}
             	<GlobalOutlined />
             </Button>
    				</Dropdown>
           <Button.Group>
             <Button onClick={() => history.push('/signIn')}>登录</Button>
             <Button onClick={() => history.push('/register')}>注册</Button>
           </Button.Group>
   		</div>
       )
     }
   }
   
   export const Header = connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderComponent))
   ```

4. `store`数据封装

   - 新建目录：`src/redux`、`src/redux/language`
   - 新建文件：`src/redux/store.ts`、`src/redux/language/actionCreators.ts`，`src/redux/language/reducers.ts`

   ```bash
   mkdir src/redux src/redux/language
   touch src/redux/language/actionCreators.ts
   touch src/redux/language/reducer.ts
   ```

   - `store.ts`

   ```js
   import { createStore } from 'redux'
   import languageReducer form './language/reducer.ts'
   
   const store = createStore(languageReducer)
   
   // 使用ts的条件类型 ReturnType<T>，T:函数类型。 获取函数返回值的类型 
   export type RootState = ReturnType<typeof store.getState>
   
   export default store
   ```

   - 工厂模式创建action- `actionCreators.ts`

   ```js
   /* 用常量定义action.type，减少代码敲错 */
   export const ADD_LANGUAGE = 'language/add'
   export const CHANGE_LANGUAGE = 'language/change'
   
   /* action的类型申明 */
   const AddActionProps = {
     type: typeof ADD_LANGUAGE,
     payload: { code: string, language: string }
   }
   const ChangeActionProps = {
     type: typeof CHANGE_LANGUAGE,
     payload: 'zh' | 'en'
   }
   
   export type LanguageActionProps = AddActionProps | ChangeActionProps
   
   /* 用工厂模式创建action */
   export const addLanguageActionCreator = (language: {code: string, language: string}):ADD_LANGUAGE  => {
     return {
       type: ADD_LANGUAGE,
       payload: language
     }
   }
   export const changeLanguageActionCreator = (lng: 'zh' | 'en'):CHANGE_LANGUAGE  => {
     return {
       type: CHANGE_LANGUAGE,
       payload: lng
     }
   }
   ```

   - `reducer.ts`

   ```ts
   import { ADD_LANGUAGE, CHANGE_LANGUAGE, LanguageActionProps } from './actions'
   
   export interface LanguageState {
     lng: 'zh' | 'en',
     languageList: {code: string, language: string}[]
   }
   
   const defaultStoreState: LanguageState = {
     lng: 'zh',
     languageList: [{ code: 'zh', language: '中文'}， { code: 'en', language: 'English'}]
   }
   
   
   export default (state = defaultStoreState, action:LanguageActionProps) => {
       switch (action.type) {
       case CHANGE_LANGUAGE:
         return { ...state, lng: action.payload }
       case ADD_LANGUAGE:
         return { ...state, languageList: [...state.languageList, action.payload] }
       default:
         return state
     }
   }
   ```