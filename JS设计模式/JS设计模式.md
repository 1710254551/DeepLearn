# JS设计模式

## 原型链

​	 **基本规则**

- 所有的数据都是对象
- 要得到一个对象,不是通过实例化类,而是找到一个对象作为原型克隆它
- 对象会记住它的原型
- 如果对象无法响应某个请求,它会把这个请求委托给它自己的原型.

### 数据都是对象

​	JS中的根对象是Object.prototype,这本身是一个空对象.每当我们用 new Object() 或 {} 创建一个对象时,都是从Object.prototype对象克隆而来.

```
var obj1 = new Object()
var obj2 = {}

Object.getPrototypeOf(obj1) === Object.prototype  //true
Object.getPrototypeOf(obj2) === Object.prototype  //true
```

### 得到对象,不通过实例化类,而是克隆原型对象

​	在JS中没有类的概念,但能调用new 方法.这是因为当new 执行函数时,此时函数是一个构造器.用new 创建对象的过程,实际上就是克隆Object.prototy对象,并进行一些额外的操作的过程.

```
function Person(name){
	this.name = name
}
Person.prototype.getName = function(){
	return this.name
}
var a = new Person('jack')

a.name // jack
a.getName // jack
Object.getPrototypeOf(a) === Person.prototype // true
```



### 对象会记住它的原型

​	对JS的真正实现来说,其实并不能说对象有原型,而是对象的构造器有原型,把`对象把请求委托给自己的原型`,准确来说是委托给自己的构造器的原型.

​	JS给对象提供了一个`__proto__`的隐藏属性,这个属性为默认指向它的构造器的原型

```
var a = new Object()
a.__proto__ === Object.prototype // true
```

​	正因为对象要通过`__proto__`来记住它的构造器的原型,当模拟new创建对象时,就需要手动改变`__proto__`的指向.

```
obj.__proto__ = Person.prototype
```

 	这就让`obj.__proto__`指向Person.prototype,而不是Object.prototype.

### 如果对象无法响应某个请求,它会把这个请求委托给它自己的原型

​	这条规则是原型继承的精髓所在,当一个对象无法响应某个请求时,它会顺着原型链把请求传递下去,直到遇到可以处理改请求的对象为止.

​	实际上,虽然JS的对象最初都是由Object.prototype对象克隆而来的,但对象构造器的原型并不仅限于Object.prototype,而是可以动态指向其他对象.这样可以有选择性的把对象a的构造器的原型指向对象b,从而达到继承的效果.

```
var obj = {name:'jack'}
var A = function(){}
A.prototype = obj
var a = new A()

a.name // jack
```

这时的引擎:

- 首先,尝试遍历对象a中的所有属性,但没有name属性
- 查找name属性的请求被委托给了对象a的构造器的原型,它被`a.__proto__`记录着并指向A.prototype,而A.prototype被设置为对象obj.
- 在对象obj中找到name属性,并返回它的值.

当期望一个'类'继承自另一个'类'的效果时:

```
var A = function(){}
A.prototype ={name:'jack'}

var B = function(){}
B.prototype = new A()

var b = new B()

b.name // jack
```

这时的引擎:

- 首先,尝试遍历对象b中的所有属性,但没有name属性
- 查找name属性的请求被委托给了对象B的构造器的原型,它被`b.__proto__`记录着并指向new A()所创建的对象
- 在此对象中没有找到name属性,则被委托给了对象A的构造器的原型A.prototype.
- 在对象A.prototype中找到name属性,并返回它的值.

最后,原型链并不是无限长的,当访问对象a一个它自身和原型都不存在的属性,则会到Object.prototype中查找,当还是不存在时,因为Object.prototype的原型是null,之后再无别的节点,最好的结果就是`undefined`

## this, call和apply

### this

​	和别的语言不一样,JS的this总是指向一个对象,而具体指向哪个对象,是在运行时基于函数的执行环境动态绑定的,而非函数被声明时的环境.

#### this的指向

1. 作为对象的方法调用

```
当函数作为对象的方法被调用时,this指向该对象

var obj ={
	name:'jack',
	getName:function(){
		console.log( this === obj ) //true
		console.log( this.a )  // jack
	}
}

obj.getName()
```



2. 作为普通函数调用

```
当函数不作为对象的属性被调用,也就是普通函数方式,此时的this总是指向全局对象.在JS中全局对象就是window

window.name = 'jack'
var getName = function(){
	return this.name
}
getName()   // jack

or

window.name = 'marco'
var obj = {
	name:'jack'
	getName:function(){
		return this.name
	}
}
var myName = obj.getName  
myName()  // marco

```

​	在es5的strict模式下,this在默认下指向undefined

3. 构造器调用

   JS没有类,但可以从构造器中创建对象,同时也有new运算符

   当new调用构造函数时,改函数总会返回一个对象,这时函数中的this就会指向这个对象.

```

var myClass=function(){
	this.name = 'king'
}
var obj = new myClass()
obj.name  // king

```

​		但在构造器显式的返回一个对象时,那么此次运算最终会返回这个对象,而this也将指向这个对象

```
var myClass=function(){
	this.name = 'king'
	return {
		name:'jack'
	}
}
var obj = new myClass()
obj.name  // jack
```

​		若构造器显式返回的不是一个对象,或没有返回,则不会出现上面的情况

4. call或apply调用	

   call和apply可以动态的改变传入的this.

``` 
var obj1 = {
	name:'jack'
	getName:function(){
		return this.name
	}
}

var obj2 = {
	name:'marco'
}

obj1.getName()  // jack
obj1.getName.call( obj2 )  // marco
```

#### call和apply的区别

call和apply的作用是一样的,不同点在于传入参数的方式

1. apply接受两个参数,第一个是指定函数体内this对象的指向,第二个参数为数组或类数组,apply会把这个数组中的元素作为参数传入被调用的函数

```
var func = function (a,b,c){
	return [a,b,c]
}
func.apply(null,[1,2,3])  // [1,2,3]
```

2. call传入的参数不固定,和apply不同,从第二个参数开始,依次作为参数传入被调用的函数

```
var func = function (a,b,c){
	return [a,b,c]
}
func.call(null,1,2,3)  // [1,2,3]
```

​	更多的时候,我们并不关心有多少参数传入,只用apply一股脑的推过去就可以了.

#### call和apply的用途

1. 改变this的指向

2. 实现bind

   大部分的高级浏览器都实现了内置bind,这里我们模拟一个bind

```
Function.prototype.bind = function(){
	var self = this,
		context = [].shift.call(arguments),
		args = [].slice.call(arguments);
	retrun function(){
		return self.apply(context,[].concat.call(args,[].slice.call( arguments )))
	}
}

var obj = {
	name : 'jack'
}

var func = function(){
console.log(this.name,[a,b,c])  
}.bind(obj,1,2)

func(3)  // jack [1,2,3]
```



1. 借用其他对象的方法