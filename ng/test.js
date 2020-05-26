angular.module('testApp', []);
angular.module('testApp').controller('testCtrl', ['$scope', function ($scope) {
    $scope.img = './test.png';
    $('img').attr('src1', './test.png');
    $scope.clickButton = function () {
        $('img').attr('src', './test.png');
    };
}]);

$(function () {
    $('img').attr('src', './test.png');
});

let testRt = $.ajax('./test.png');
testRt.then(respose => {
    console.log(1);
    return respose;
}).then(respose => {
    console.log(2);
});
console.log(testRt);
