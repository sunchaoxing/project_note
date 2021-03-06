/**
 *  原型链继承  将父类的实例作为子类的原型
 *  特点： 
 *     1 实例是子类的实例，也是父类的实例
 *     2 父类新增原型方法或原型属性，子类否能访问到
 *     3 简单，易于实现
 *  缺点：
 *     1 要想为子类新增属性和方法，必须要在 new Animal() 这样的语句之后执行，不能放到构造器中
 *     2 无法实现多继承
 *     3 来自原型对象的引用属性是所有实例共享
 *     4 创建子类实例时，无法向父类构造函数传参
 */
// 定义一个动物类
function Animal(name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function () {
    console.log(this.name + '正在睡觉！');
  }
}
// 原型方法
Animal.prototype.eat = function (food) {
  console.log(this.name + '正在吃：' + food);
};

function Cat() {
}
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';

//　Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.eat('fish'));
console.log(cat.sleep());
console.log(cat instanceof Animal); //true 
console.log(cat instanceof Cat); //true



/**
 *  构造函数继承  使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类(没有用到原型)
 *  特点：
 *      1 子类实例共享父类引用属性的问题
 *      2 创建子类实例时，可以向父类传参
 *      3 可以实现多继承( call 多个父类对象)
 *  缺点：
 *      1 子类并不是父类实例，只是子类实例
 *      2 只能继承父类的实例属性和方法，不能继承原型属性和方法
 *      3 无法实现函数复用,每个子类都有父类实例函数的副本，影响性能
 */

function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true


/**
 *  实例继承 为父类实例添加新特性，作为子类实例返回
 *  
 * 
 */

/**
 *  组合继承 通过调用父类构造，继承父类的属性并保留传参的有点，然后将父类实例作为子类原型，实现函数复用
 *  缺点： 
 *      1 调用了两侧父类构造函数，生成了两份实例(子类实例将子类原型上的那份屏蔽了)
 */
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true
 /**
  *  寄生组合继承  通过寄生方式，砍掉父类的实例属性，在调用两次父类的构造的时候，就不会初始化两次实例方法属性，避免组合继承的缺点
  *  
  * 
  */

 function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Animal.prototype;
  //将实例作为子类的原型
  Cat.prototype = new Super();
})();

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true