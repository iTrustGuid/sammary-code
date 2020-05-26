window.onload = function () {
  document.getElementById('id2').addEventListener('click', function () {
    console.log('捕获DIV')
  }, true)
  document.getElementById('id2').addEventListener('click', function () {
    console.log('捕获P')
  }, true)
  document.getElementById('id1').addEventListener('click', function () {
    console.log('冒泡DIV')
  }, false)
  document.getElementById('id2').addEventListener('click', function () {
    console.log('冒泡P')
  }, false)

  // 1.W3C集成了微软的冒泡和网景的捕获事件流，先捕获后冒泡
  // 2.对于事件目标元素，冒泡和捕获事件先注册先触发
}
