{
    let str = 'string';
    let pNum = 11;
    let bRt = true;
    let pSymbol = Symbol('symbol');
    let pObj = {};
    let pArray = [];
    let fun = function () {};

    //typeof
    console.log('typeof');
    console.log('字符串', typeof str); //string
    console.log('数字', typeof pNum); //number
    console.log('布尔', typeof bRt); //boolean
    console.log('符号', typeof pSymbol); //symbol
    console.log('null', typeof null); //object
    console.log('undefined', typeof undefined); //undefined
    console.log('对象', typeof pObj); //object
    console.log('数组', typeof pArray); //object
    console.log('函数', typeof fun); //function

    //instanceof 做原型判断，只能判断具有原型的变量
    //而且只能用来判断两个对象是否属于实例关系，不能判断类型
    console.log('instanceof');
    console.log('对象', pObj instanceof Object); //true
    console.log('数组是否数组', pArray instanceof Array); //true
    console.log('数组是否对象', pArray instanceof Object); //true
    console.log('函数是否函数', fun instanceof Function); //true
    console.log('函数是否对象', fun instanceof Object); //true

    //construct或__proto__
    //原理都是通过原型链来判断
    console.log('construct');
    console.log('字符串', str.construct === String.construct); //true
    // console.log('数字', typeof pNum); //数字没有construct
    console.log('布尔', bRt.construct === Boolean.construct); //true
    // console.log('符号', typeof pSymbol); //symbol没有construct
    // console.log('null', typeof null); //null无法访问construct属性
    // console.log('undefined', typeof undefined); //undefined无法访问construct属性
    console.log('对象', pObj.construct === Object.construct); //true
    console.log('数组', pArray.construct === Array.construct); //true
    console.log('函数', fun.construct === Function.construct); //true

    console.log('__proto__');
    /* eslint-disable */
    console.log('字符串', str.__proto__ === String.prototype); //true
    // console.log('数字', typeof pNum); //数字没有prototype
    console.log('布尔', bRt.__proto__ === Boolean.prototype); //true
    // console.log('符号', typeof pSymbol); //symbol没有prototype
    // console.log('null', typeof null); //null无法访问prototype属性
    // console.log('undefined', typeof undefined); //undefined无法访问prototype属性
    console.log('对象', pObj.__proto__ === Object.prototype); //true
    console.log('数组', pArray.__proto__ === Array.prototype); //true
    console.log('函数', fun.__proto__ === Function.prototype); //true
    /* eslint-enable */

    //toString
    console.log('toString');
    console.log('字符串', Object.prototype.toString.call(str)); //[object String]
    console.log('数字', Object.prototype.toString.call(pNum)); //[object Number]
    console.log('布尔', Object.prototype.toString.call(bRt)); //[object Boolean]
    console.log('符号', Object.prototype.toString.call(pSymbol)); //[object Symbol]
    console.log('null', Object.prototype.toString.call(null)); //[object Null]
    console.log('undefined', Object.prototype.toString.call(undefined)); //[object Undefined]
    console.log('对象', Object.prototype.toString.call(pObj)); //[object Object]
    console.log('数组', Object.prototype.toString.call(pArray)); //[object Array]
    console.log('函数', Object.prototype.toString.call(fun)); //[object Function]
    console.log('日期', Object.prototype.toString.call(new Date())); //[object Date]
    console.log('window', Object.prototype.toString.call(window)); //[object HTMLDocument]
    console.log('document', Object.prototype.toString.call(document)); //[object global]
}
