// export function reg() {
//   const string = 'black*raven lime*parrot white*seagull';
//   const regex = /(?<color>.*?)\*(?<bird>[a-z0-9]+)/g;
//   let match;
//   while (match = regex.exec(string)) {
//     let value = match[0];
//     let index = match.index;
//     let input = match.input;
//     // console.log(`${value} at ${index} with '${input}'`);
//     // console.log(match.groups.color);
//     // console.log(match.groups.bird);
//   }
// }

export function es7() {
  // es7
  // includes 要搜索的值和搜索的开始索引
  console.log(['a', 'b', 'c'].includes('a'), 'includes');
  console.log(['a', 'b', 'c', 'd'].includes('b', 1), 'includes');
  console.log(['a', 'b', 'c', 'd'].includes('b', 2));

  // 幂运算
  console.log(3 ** 2, '//9');
  // 效果同
  Math.pow(3, 2); // 9
  console.log(Math.pow(3, 2));
  let b = 3;
  b **= 2;
  console.log(b); // 9
}

export function es8() {
  // const count = () => new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       reject('promise故意抛出异常');
  //     }, 1000);
  //   });
  // const list = () => new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve([1, 2, 3]);
  //     }, 1000);
  //   });
  // const getList = async () => {
  //   const c = await count();
  //   console.log('async'); // 此段代码并没有执行
  //   const l = await list();
  //   return { count: c, list: l };
  // };
  // console.time('start');
  // getList().then((res) => {
  //   console.log(res);
  // })
  //   .catch((err) => {
  //     console.timeEnd('start');
  //     console.log(err);
  //   });

  /**
   * 并行  所耗时间将是两个异步操作中耗时最长的耗时。
   * await Promise.all([count(), list()]);
   */
  // let count = () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(100);
  //     }, 500);
  //   });
  // }
  // let list = () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve([1, 2, 3]);
  //     }, 500);
  //   });
  // }
  // let getList = async () => {
  //   let result = await Promise.all([count(), list()]);
  //   return result;
  // }
  // console.time('begin');
  // getList().then(result => {
  //   console.timeEnd('begin');  //begin: 505.557ms
  //   console.log(result);       //[ 100, [ 1, 2, 3 ] ]
  // }).catch(err => {
  //   console.timeEnd('begin');
  //   console.log(err);
  // });

  /**
   * 2.Object.entries()
   */
  // 对象的key值是数字,返回的是排序后的结果
  Object.entries({ 3: 'a', 4: 'b', 1: 'c' }); // [['1', 'c'], ['3', 'a'], ['4', 'b']]
  Object.entries([1, 2]); // [['0', 1], ['1', 2]]
  // 若是键名是Symbol，编译时会被自动忽略
  Object.entries({ [Symbol()]: 1, two: 2 }); // [['two', 2]]
  console.log(Object.entries({ [Symbol()]: 1, two: 2 }));

  // 去除字符串里面的重复字符。
  const set = new Set('ababbc');
  console.log(set);// Set(3) {"a", "b", "c"}

  // 创建map结构
  const map = new Map([
    [true, 7],
    [{ foo: 3 }, ['abc']]
  ]);
  console.log(...map, 'map');

  // 利用Object.entries()创建一个真正的Map
  const obj = { foo: 'bar', baz: 42 };

  const map1 = new Map([['foo', 'bar'], ['baz', 42]]); // 原本的创建方式
  const map2 = new Map(Object.entries(obj)); // 等同于map1

  console.log(map1);// Map { foo: "bar", baz: 42 }
  console.log(map2);// Map { foo: "bar", baz: 42 }

  /**
   * padStart padEnd
   */
  'Vue'.padEnd(10, '_*'); // 'Vue_*_*_*_'
  'React'.padEnd(10, 'Hello'); // 'ReactHello'
  'JavaScript'.padEnd(10, 'Hi'); // 'JavaScript'
  'JavaScript'.padEnd(8, 'Hi'); // 'JavaScript'

  /**
   * Object.getOwnPropertyDescriptors()
   */
  const obj2 = {
    id: 1,
    name: '霖呆呆',
    get gender() {
      console.log('gender');
      return 1;
    },
    set grad(d) {
      console.log(d);
    }
  };
  console.log(Object.getOwnPropertyDescriptors(obj2, 'id'));
  // 输出结果应该为
  // {
  //   id: {
  //     configurable: true,
  //     enumerable: true,
  //     value: 1,
  //     writable: true
  //   }
  // }

  /**
   * 修饰器
   */
  @addSkill
  class Person { }

  function addSkill(target) {
    target.say = 'hello world'; // 直接添加到类中
    target.prototype.eat = 'apple'; // 添加到类的原型对象中
  }
  const personOne = new Person();

  console.log(Person.say); // 'hello world'
  console.log(personOne.eat); // 'apple'
}

export function extendObject() {
  // 1.简单对象的创建
  // let book = {
  //   name: "乐园",
  //   get nameGet() {
  //     console.log(this.name,"Get")
  //     return this.name
  //   },
  //   set nameSet(value) {
  //     console.log(value,"set")
  //     this.name = value;
  //   }
  // }
  // book.nameSet = "开心";
  // console.log(book.nameGet,book)

  // 2.定义属性特性
  // let book = {};
  // Object.defineProperties(book, {
  //   // _name: {
  //   //   configurable: true,
  //   //   writable: true,
  //   //   value: "roy"
  //   // },
  //   name: {
  //     get: function() {
  //       console.log(this, "get")
  //       return this._name;
  //     },
  //     set: function(value){
  //       console.log(value,"set")
  //       this._name = value;
  //     }
  //   }
  // })
  // // Object.defineProperties(book, {
  // //   _name: {
  // //     configurable: true,
  // //     writable: true,
  // //     value: "roy"
  // //   },
  // //   get name() {
  // //     console.log(this, "get")
  // //     return this._name
  // //   },
  // //   set name(value) {
  // //     this.name = value;
  // //   }
  // // })
  // book.name = 34
  // console.log(book.name)

  // let book = {
  //   name: "乐园"
  // }
  // book.__defineGetter__('nameGet',function() {
  //   console.log(this.name,"Get")
  //   return this.name
  // }),
  // book.__defineSetter__('nameSet',function(value) {
  //   console.log(value,"set")
  //   this.name = value;
  // })
  // book.nameSet = "开心";
  // console.log(book.nameGet);

}
