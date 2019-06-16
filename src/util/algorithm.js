/**
 * 斐波那契数列
 * @param {*} max 
 * console.log(fbn(20),"fbn")
 * (20) [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181]0: 01: 12: 13: 24: 35: 56: 87: 138: 219: 3410: 5511: 8912: 14413: 23314: 37715: 61016: 98717: 159718: 258419: 4181length: 20__proto__: Array(0) "fbn"
 */
export function fbn(max) {
  var a = 0, b = 1, arr = [0, 1];
  while (arr.length < max) {
    [a, b] = [b, a + b];
    arr.push(b);
  }
  return arr;
}
// generator（生成器）是ES6标准引入的新的数据类型。
// let f = fnag(5);
// console.log(f.next(),"generator")
// console.log(f.next(),"generator")
// console.log(f.next(),"generator")
// console.log(f.next(),"generator")
// 直接用for ... of循环迭代generator对象
// for (var x of f) {
//   console.log(x);
// }
function* fnag(max) {
  var a = 0, b = 1, n = 0;
  while (n < max) {
    yield a;
    [a, b] = [b, a + b];
    n++;
  }
  return;
}
