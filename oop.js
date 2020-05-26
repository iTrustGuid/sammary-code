//面向对象实现方式

//第一种：ES5实现方式
function ES5Class () {
    this.name = 'ES5Class';
}

ES5Class.prototype.log = function () {
    console.log('ES5Class');
};

//派生函数
ES5Class.extend = function () {
    var _this = this;
    //创建子类
    var NewClass = function () {
        _this.call(this);
    };

    //子类同样具有派生功能
    NewClass.extend = this.extend;

    //维护原型对象
    //第一步：创建一个临时函数，以供包装父类原型对象之用。这里是考虑到兼容性的用法，
    //效果同 NewClass.prototype = Object.create(this.prototype);
    //第二步：维护原型对象上的构造函数
    var TempF = function () {};
    TempF.prototype = this.prototype;
    NewClass.prototype = new TempF();
    NewClass.prototype.constructor = NewClass;

    return NewClass;
};

//派生子类
var ES5SubClass = ES5Class.extend();
ES5SubClass.prototype.log1 = function () {
    console.log('ES5SubClass');
};

var es5SubObj = new ES5SubClass();
es5SubObj.log();
es5SubObj.log1();

//子类继续派生子类
var ES5Sub2Class = ES5SubClass.extend();
ES5Sub2Class.prototype.log2 = function () {
    console.log('ES5Sub2Class');
};
var es5Sub2Obj = new ES5Sub2Class();
es5Sub2Obj.log();
es5Sub2Obj.log1();
es5Sub2Obj.log2();

//第二种：ES5的另一种实现方式
//相比第一种优势在于我们可以在原型对象链上清晰地看到构造函数是谁
//缺点是除了声明函数，我们还要额外调用inherits方法
function inherits (child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
}

function ES5Class2 () {

}

function ES5SubClass2 () {

}
inherits(ES5SubClass2, ES5Class2);

//第三种：ES6实现方式
//基本和java中的申明方式一致了
class ES6Class {
    constructor () {
        this.name = 'ES6Class';
    }
    log () {
        console.log('ES6Class');
    }
}

class ES6SubClass extends ES6Class {
    constructor () {
        super();
    }
    log1 () {
        console.log('ES6SubClass');
    }
}

class ES6Sub2Class extends ES6SubClass {
    constructor () {
        super();
    }
    log2 () {
        console.log('ES6Sub2Class');
    }
}

var es6Sub2Obj = new ES6Sub2Class();
es6Sub2Obj.log2();
