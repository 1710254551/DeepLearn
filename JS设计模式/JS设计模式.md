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