## js 数组方法

js 的数组方法有很多,虽然有些是不常用的但也得有些印象.
关于数组方法的使用场景,自然是在需要处理数组数据的时候,只是不同的方法有着不同的特性使用场景也不同.

### push

常用方法之一,向数组最后推进一个元素,返回推进后的数组长度

```
let arr = [1,2,3]
console.log(arr.push(4))  //4
console.log(arr)  //[1,2,3,4]
```

### shift

删除数组第一个元素,返回被删除的元素

```
let arr = [[9],2,3]
console.log(arr.shift()) // [9]
```

### unshift

向数组第一位添加一个元素,已有元素后移一位,返回处理后的数组长度

```
let arr = [1,2]
console.log(arr.unshift(0)) // 3
```

### pop

删除数组最后一个元素，并返回该元素

```
let arr = [1,2,3]
arr.pop()  //3
arr //[1,2]
```

### map

数组遍历方法,接收一个函数,函数中有 3 个参数(item[元素],index[下标],arr[本体]),将函数中返回的内容放进一个数组中返回一个新的数组.

```
let arr = [1,2,3]
console.log(arr.map(item=>item*item)) // [1,4,9]
```

有一道关于 map 的面试题

```
let arr = [10,10,10]
arr.map(parseInt) // ??
```

答案是 [10,NaN,2]
这是因为 parseInt 自带 2 个参数(string,radix),而 map 会给予 3 个参数,radix=0 时会默然按 10 来执行,而当 radix<2 || radix>36 时会返回 NaN,

### for...in... | for...of...

这两个是 Object 和 Array 的共有方法,for...in...是遍历键；for...of...是遍历值
因为数组很特殊,for...in...时相当于遍历下标

### slice

数组切割方法,不破坏源数组,返回一个数组,接收两个参数(start,end)默认为`0和数组长度`,可以是负数;

```
let arr = [1,2,3]
arr.slice(1,2)  //[2]
arr.slice(-1)  //[3]
```

### splice

数组元素删除和添加方法,破坏源数组,返回一个数组,接受三个参数(start,conut,value),和 slice 不同,count 表示希望删除的个数,并将删除的元素返回到一个数组,不设置则删除 start 之后的所有,value 会在源数组的 start 位置替换

```
let arr = [1,2,3]
arr.splice(1,2)  //[2,3]
arr.splice(-1)  //[3]
arr.splice(1,2,'2')  //[2,3] 此时arr [1,'2']
```

### reduce

数字数组的和计算方法,这个方法有两个参数(func,sum),sum 是一个基数任意设置,这个值为赋给 func 中的第一个参数,func 可以接收四个参数(sum,item,index,arr),处了 sum,其它和 map 相同.`注意:参数位置是固定的`

```
var arr = [1,2,3]
arr.reduce((sum,item,index,arr)=>sum+=item,0)  //6
```

### some

数组条件判断方法,以一个函数为参数,这个函数接收三个参数(item,index,arr)和 map 相同,返回的判断条件只要有一次是 true,则整体返回 true 否则返回 false

```
let arr = [1,2,10]
arr.some((item,index,arr)=>item>=10)  // true
```

### every

数组条件判断方法,以一个函数为参数,这个函数接收三个参数(item,index,arr)和 map 相同,返回的判断条件只有全为 true,则整体返回 true 否则返回 false

```
let arr = [1,2,10]
arr.every((item,index,arr)=>item>=10)  // false
arr.every((item,index,arr)=>index<=arr.length)  // true
```

### concat()

数组拼接方法,可以将两个数组进行拼接并返回一个新的数组;数组内部的对象或数组依旧会受源数组影响,因为这只是浅拷贝;

```
let arr = [1,2,3]
let arr2 = [4,5]
arr.concat(arr2)  //[1,2,3,4,5]
```

### fill()

数组填充方法,可以指定字符填充整个数组;

```
let arr = [1,2,3]
arr.fill(5) //[5,5,5]
```

### filter()

数组过滤方法,返回符合条件的元素放入一个新的数组,使用方法和 map 相同,只是 filter 的函数中是返回一个条件判断表达式

```
let arr = [1,2,3,4]
arr.filter((item)=>item%2===0)  //[2,4]
```

### find() | findIndex()

数组查找,查找指定条件的数组元素;功能和 filter 相同;只是 find()是返回第一个符合条件的值如果不存在返回 undefined;findIndex()也是返回第一个符合条件的值的下标,如果不存在返回-1

```
let arr = [1,2,3,4]
arr.find((item)=>item%2===0)  //2
arr.findIndex((item)=>item%2===0)  //1
arr.find((item)=>item>5)  //undefined
arr.findIndex((item)=>item>5)  //-1
```

### forEach()

forEach 和 map 相同,都是数组遍历,只是 forEach 的遍历会将元素直接返回而且 forEach 可以设置`return;`跳过元素,map 设置`return;`还是会返回 undefined;

```
let arr = [1,2,3]
arr.map(item=>{
	if(item%2===0)return;
	return item
})  // [1,undefined,3]

arr.forEach(item=>{
	if(item%2===0)return ;
	console.log(item)
})  // 1 3
```

### includes()

判断一个值是否在一个数组里

```
let arr = [1,2,3,4,'5']
arr.includes(2)   // true
arr.includes('5')   // true
arr.includes(5)   // false  可以看出内部使用的是===
```

### indexOf() | lastIndexOf()

返回指定字符第一次出现的位置下标和返回指定字符最后一次出现的位置下标

```
let arr = [1,2,3,4,2]
arr.indexOf(2)  // 1
arr.lastIndexOf(2)  //4
```

### isArray()

判断对象是否是数组

```
let arr = [1,2,3]
let obj = {name:'ob'}
arr.isArray()  // true
obj.isArray()  //flase
```

### join()

数组转字符串方法,可以指定字符分隔,默认是`,`

```
let arr = [1,2,3]
arr.join()   // '1,2,3'
提到join不得不提一下字符串方法split
split()  字符串转数组方法,可以指定字符分隔,默认是将整个字符串放进数组;这里的分隔是首先分隔字符串,再讲分隔后的字符串放进数组

arr.join().split()  // ['1,2,3']
arr.join().split('2') // ['1,',',3']
arr.join().split(',') // ['1','2','3']
'123'.split('') // ['1','2','3']
```

###
