//创建对象的三种方式
//第一种：对象自变量
//
//newObj1与newObj2效果相同，但第一种方式效率更高，使用更简单。
var newObj1 = {};
/* eslint-disable */
var newObj2 = new Object();
/* eslint-enable */

//第二种：new 关键字实例化一个对象
//
//使用new运算符后发生的事情：
//1.新建一个实例对象，将构造函数的原型对象赋予实例对象的__proto__属性。
//2.将实例对象绑定到构造函数的this上，执行构造函数中的代码。
//3.如果构造函数没有返回值，则直接返回该实例对象。若构造函数有返回值，则直接返回该返回值。
var TestClass = function () {
    this.name = 'TestClass';
};
TestClass.prototype.log = function () {
    console.log('TestClass-Log');
};

var newObj3 = new TestClass();

//第三种：Object.create() 函数创建对象
//
//使用Object.create() 函数发生的事情：
//1.新建一个实例对象，将传入的参数赋予实例对象的__proto__属性。
//2.返回该实例对象
//
//整体来看，Object.create() 与 new 运算符的实现机制类似，都是在原型链上再加一层，
//以派生类的方式创建一个对象。
//
//注意：ES5中才提供的API，有浏览器兼容问题。
var newObj4 = Object.create(TestClass.prototype);

console.log('新建对象：', newObj1, newObj2, newObj3, newObj4);
