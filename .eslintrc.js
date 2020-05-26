module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "standard"],
    "plugins": [
        "import",
        "node",
        "promise",
        "standard",
        "angular",
        "html"
    ],
    "globals": {
        "document": true,
        "navigator": true,
        "window": true,
        "console": true
    },
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-undef":[0],
        "no-console":[0],
        //===============================Angular规则关================================
        //一个模块只能定义一个angular组件，例如：angular.module("app").controller().directive()就是错误方式
        "angular/component-limit": ["off"],
        //在routes或states定义中，需要使用到controllerAs
        "angular/controller-as-route": ["off"],
        //在控制器中使用this，并且将this赋值给变量vm
        "angular/controller-as-vm": ["off"],
        //控制器中应该操作this而不是scope，除非是使用scope内置的对象，如：$watch()
        "angular/controller-as": ["off"],
        //不用$q.deferred(),直接使用$q(function(resolve,reject)
        "angular/deferred": ["off"],
        //定义指令不要使用class
        "angular/directive-restrict": ["off"],
        //尽可能少使用控制器，替代使用指令等
        "angular/no-controller": ["off"],
        //指令中模板如果是复杂页面元素，则使用html文件作为模板
        "angular/no-inline-template": ["off"],
        //$on 和 $watch 函数需要返回一个变量值，以便调用$destroy函数
        "angular/on-watch": ["off"],
        //angular模块中服务、指令、筛选器命名检查
        "angular/component-name": ["off"],
        //angular模块中服务、指令、筛选器命名和对应文件名称需保持一致
        "angular/file-name": ["off"],
        "angular/di-order": ["off"],
        //使用angular内置对象
        "angular/angularelement": ["off"],
        //使用angular内置对象
        "angular/definedundefined": ["off"],
        //使用angular内置对象
        "angular/foreach": ["off"],
        //使用angular内置对象
        "angular/json-functions": ["off"],
        //使用angular内置对象
        "angular/no-angular-mock": ["off"],
        //使用angular内置对象
        "angular/no-jquery-angularelement": ["off"],
        //使用angular内置对象
        "angular/typecheck-array": ["off"],
        //使用angular内置对象
        "angular/typecheck-date": ["off"],
        //使用angular内置对象
        "angular/typecheck-function": ["off"],
        //使用angular内置对象
        "angular/typecheck-number": ["off"],
        //使用angular内置对象
        "angular/typecheck-object": ["off"],
        //使用angular内置对象
        "angular/typecheck-string": ["off"],
        //指令命名规则
        "angular/directive-name": ["off", "gm"],
        //服务命名规则
        "angular/factory-name": ["off", "$"],
        //服务命名规则
        "angular/service-name": ["off", "$"],
        //服务命名规则
        "angular/provider-name": ["off", "$"],
        //使用angular.module("name")来获取模块对象，不使用变量获取
        "angular/module-getter": ["off"],
        //使用angular.module("name",[...])来定义模块时，不要获取返回模块对象
        "angular/module-setter": ["off"],
        //作用域提供的部分方法要带$
        "angular/avoid-scope-typos": ["off"],
        "angular/window-service":["off"],
        "angular/no-run-logic":["off"]
    }
};