## 1.定义初始状态

```
const initalVideoMenu: () => VideoMenu = () => {
    return {
        'Movie': [
            'Action',
            'Comedy',
            'Science Fiction',
            'Drama',
            'War',
            'Romance',
            'Horror',
            'Documentary',
            'Adventure',
            'Suspense',
            'Crime',
            'Thriller',
            'Animation',
            'Microfilm',
            'Others',
        ],
        'Animation': [
            'Domestic',
            'Japan',
            'Europe and America',
            'Others',
        ],
        'Series': [
            'Domestic',
            'Hong Kong and Taiwan',
            'Japan and Korea',
            'Europe and America',
            'Others',
        ],
        'Variety show': [

        ]
    }
}
```

## 2.创建slice

```
export const videoCategoryMenuSlice = createSlice({
    name: 'videoMenu',
    initialState: initalVideoMenu(),
    reducers: {
        setMenu: (state, action) => {
            state.value = action.payload
        }
    }
})
```

## 3.导出actions种类

```
export const { setMenu } = videoCategoryMenuSlice.actions
```

## 4.（可选）导出selector

```
// 整个state
export const { setMenu } = videoCategoryMenuSlice.actions

// 特定属性
export const selectVideoMenu = (state: ReduxState) => state.videoMenu
```

## 5.（必需）导出reducer

```
export default videoCategoryMenuSlice.reducer
```

## 6.（必需）在store中注册

```
import videoMenuReducer from './slices/videoMenuSlice'
export default configureStore({
  reducer: {
    videoMenu: videoMenuReducer,
  }
})
```

