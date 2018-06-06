//数组解构赋值
{
    let [a, b, c] = [1, 2, 3];
    console.log(a, b, c); //1 2 3

    let [foo, [bar, baz]] = [1, [
        [2], 3
    ]];
    console.log(foo, bar, baz); //1 [2] 3

    let [, , third] = [1, 2, 3];
    console.log(third); //3

    let [x, , y] = [1, 2, 3];
    console.log(x, y); //1 3

    let [head, ...tail] = [1, 2, 3, 4];
    console.log(head, tail); //1 [2, 3, 4]

    let [d, e, ...f] = ['d'];
    console.log(d, e, f); //d undefine []

    //默认值
    let [m = 1, n = 2] = [2, undefined];
    console.log(m, n);
}

//默认值
{
    let funA = function () {
        console.log('done');
    };
    //1.惰性求值
    let [x = funA()] = [1];
    console.log(x);

    //2.默认求值是和undefined来进行绝对比对的
    let [a = 'a', b = 'b', c = 'c'] = [1, null, undefined];
    console.log(a, b, c);

    //3.TDZ
    let [m = n, n = 1] = [];
    // let [m = n, n = 1] = [1];    //不会报错
    console.log(m, n); //Uncaught ReferenceError
}
