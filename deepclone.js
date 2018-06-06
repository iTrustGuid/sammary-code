function CloneOper () {

}

CloneOper.prototype.cloneObj = function (pObj) {
	if (pObj == null) {
		return null;
	}
	let result;
	if (this.isArray(pObj)) {
		result = [];
		for (let i = 0; i < pObj.length; i++) {
			result[i] = this.cloneObj(pObj[i]);
		}
	} else if (this.isObject(pObj)) {
		result = {};
		for (let key in pObj) {
			result[key] = this.cloneObj(pObj[key]);
		}
	} else if (this.isFunction(pObj)) {
		result = new Function('return ' + pObj.toString())();
	} else {
		result = pObj;
	}
	return result;
};

CloneOper.prototype.cloneObj1 = function (pObj) {
	return JSON.parse(JSON.stringify(pObj));
};

CloneOper.prototype.isArray = function (pArray) {
	return Array.isArray(pArray);
};

CloneOper.prototype.isObject = function (pObj) {
	if (pObj == null) {
		return false;
	}
	return Object.prototype.toString.call(pObj) === '[object Object]';
};

CloneOper.prototype.isFunction = function (pFun) {
	return typeof pFun === 'function';
};

{
	let pObj = {
		a: 1,
		b: {
			b1: 2,
			b2: 3
		},
		c: [1, 2, 3],
		d: function () {
			console.log('success');
		}
	};
	let cloneObj = (new CloneOper()).cloneObj(pObj);
	console.log(cloneObj === pObj, JSON.stringify(cloneObj) === JSON.stringify(pObj));
	cloneObj = (new CloneOper()).cloneObj1(pObj);
	console.log(cloneObj === pObj, JSON.stringify(cloneObj) === JSON.stringify(pObj));
}
