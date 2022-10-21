import { defineStore } from "pinia";
import { reactive } from 'vue'

export const useUserInfo = defineStore('userInfo', () => {
    const userInfo = reactive({
        name: "WJL",
        age: 12,
        sex: "男",
        description: "一点描述",
    })

    const getSexType = () => { userInfo.sex === "男" ? 1 : 0 }

    function setName(name) {
        userInfo.name = name
    }

    function setAge(age) {
        userInfo.age = age
    }

    function setSex(sex) {
        if (typeof sex === "string") {
            userInfo.sex = sex === "男" ? "男" : sex === "女" ? "女" : "未知"
        } else if (typeof sex === 'number') {
            userInfo.sex = sex === 1 ? "男" : sex === 0 ? "女" : "未知"
        } else {
            throw new Error(`使用了非法的类型赋值`);
        }
    }

    function setDescription(description){
        userInfo.description = description
    }

    return { userInfo, getSexType, setName, setAge, setSex, setDescription }
}, {

})