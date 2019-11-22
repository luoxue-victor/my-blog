"use strict";
exports.__esModule = true;
// 子类必须要实现 Feature 接口的方法
// 这样我们就可以创建白色叫声喵喵喵的猫了
var Cat = /** @class */ (function () {
    function Cat() {
        this.color = "白色";
    }
    Cat.prototype.bark = function () {
        console.log(this.color + " \u55B5\u55B5\u55B5");
    };
    return Cat;
}());
// 创建 Dog 类
var Dog = /** @class */ (function () {
    function Dog() {
        this.color = "黑色";
    }
    Dog.prototype.bark = function () {
        console.log(this.color + " \u6C6A\u6C6A\u6C6A");
    };
    return Dog;
}());
// 这就是一个动物工厂
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.createAnimal = function (type) {
        switch (type) {
            case 'cat':
                return new Cat();
            case 'dog':
                return new Dog();
        }
    };
    return Animal;
}());
var animal = new Animal();
var cat = animal.createAnimal('cat');
var dog = animal.createAnimal('dog');
cat.bark();
dog.bark();
exports["default"] = Animal;