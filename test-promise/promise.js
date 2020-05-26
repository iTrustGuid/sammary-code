/**
 * 自定义promise对象
 */
class Promise {
    /**
     * 构造函数
     * @param  {Function} excutor 执行器
     */
    constructor (excutor) {
        //promise状态，有pending、resolved、rejected
        this.status = 'pending';

        //终值
        this.value;

        //拒因
        this.reason;

        //解决函数队列
        this.resolveFuns = [];

        //拒绝函数队列
        this.rejectFuns = [];

        //解决函数
        let resolve = val => {
            if (this.status === 'pending') {
                this.status = 'resolved';
                this.value = val;
                this.resolveFuns.forEach(func => func());
            }
        };

        //拒绝函数
        let reject = reason => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                this.rejectFuns.forEach(func => func());
            }
        };

        try {
            excutor(resolve, reject);
        } catch (ex) {
            reject(ex);
        }
    }

    /**
     * 回调函数处理
     * @param  {Function} resolveCallBack 执行回调函数
     * @param  {Function} rejectCallBack  拒绝回调函数
     * @return {promise}                 新创建的promise
     */
    then (resolveCallBack, rejectCallBack) {
        //如果resolveCallBack不是函数，则将值传递到下一个resolveCallBack函数中
        resolveCallBack = Promise.isFunction(resolveCallBack) ? resolveCallBack : x => x;

        //如果rejectCallBack不是函数，则将原因传递到下一个rejectCallBack函数中
        rejectCallBack = Promise.isFunction(rejectCallBack) ? rejectCallBack : reason => {
            throw reason;
        };

        /**
         * 解决promise函数
         * @param  {promise} promise 待解决的promise
         * @param  {*} x       上一个promise的终值
         * @param  {Function} resolve promise的执行回调函数
         * @param  {Function} reject  promise的拒绝回调函数
         */
        function resolvePromise (promise, x, resolve, reject) {
            if (x === promise) {
            	reject(new TypeError('终值与Promise相等，陷入死循环！'));
            	return;
            }
            let bCalled = false;
            if (x != null && (Promise.isFunction(x) || Promise.isObject(x))) {
                try {
                	let then = x.then;
                    if (Promise.isFunction(then)) {
                        then.call(x, y => {
                            if (bCalled === true) {
                                return;
                            }
                            bCalled = true;
                            resolvePromise(promise, y, resolve, reject);
                        }, r => {
                            if (bCalled === true) {
                                return;
                            }
                            bCalled = true;
                            reject(r);
                        });
                    } else {
                        if (bCalled === true) {
                            return;
                        }
                        bCalled = true;
                        resolve(x);
                    }
                } catch (ex) {
                    if (bCalled === true) {
                        return;
                    }
                    bCalled = true;
                    reject(ex);
                }
            } else {
                if (bCalled === true) {
                    return;
                }
                bCalled = true;
                resolve(x);
            }
        }

        let pDeffer = Promise.defer();
        if (this.status === 'pending') {
            //如果promise状态为pending则将回调函数加入队列中
            //添加解决函数队列
            this.resolveFuns.push(() => {
                setTimeout(() => {
                	try {
	                    let x = resolveCallBack(this.value);
	                    resolvePromise(pDeffer.promise, x, pDeffer.resolve, pDeffer.reject);
                	} catch (ex) {
                		pDeffer.reject(ex);
                	}
                }, 0);
            });

            //添加拒绝函数队列
            this.rejectFuns.push(() => {
                setTimeout(() => {
                	try {
	                    let x = rejectCallBack(this.reason);
	                    resolvePromise(pDeffer.promise, x, pDeffer.resolve, pDeffer.reject);
                	} catch (ex) {
                		pDeffer.reject(ex);
                	}
                }, 0);
            });
        } else if (this.status === 'resolved') {
            //如果promise状态为resolved，则立即执行resolveCallBack回调函数，
            //如此则无论promise是否已经执行完毕，回调函数都必然会执行
            setTimeout(() => {
            	try {
	                let x = resolveCallBack(this.value);
	                resolvePromise(pDeffer.promise, x, pDeffer.resolve, pDeffer.reject);
            	} catch (ex) {
            		pDeffer.reject(ex);
            	}
            }, 0);
        } else if (this.status === 'rejected') {
            //如果promise状态为rejected，则立即执行rejectedCallBack回调函数，
            //原因同上
            setTimeout(() => {
            	try {
	                let x = rejectCallBack(this.reason);
	                resolvePromise(pDeffer.promise, x, pDeffer.resolve, pDeffer.reject);
            	} catch (ex) {
            		pDeffer.reject(ex);
            	}
            }, 0);
        }

        return pDeffer.promise;
    }
}

Promise.isFunction = val => {
    return Object.prototype.toString.call(val) === '[object Function]';
};

Promise.isObject = val => {
    return Object.prototype.toString.call(val) === '[object Object]';
};

/**
 * 创建一个默认的promise（语法糖）
 * @return {Object} deffer对象
 */
Promise.defer = Promise.deferred = () => {
    let defer = {};
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
};

module.exports = Promise;
