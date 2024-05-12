// 判断对象数组内是否存在某个元素
const hasKey = (arr:any, keyName:string ,key:string, show:boolean = false) => {
    if(show){
        const obj = {
            res:arr.some(item => item[keyName] === key),
        }
        obj[keyName] = key
        return obj
    }
    return arr.some(item => item[keyName] === key)
  }

  export default hasKey