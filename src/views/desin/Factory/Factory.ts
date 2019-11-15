// 定义工厂需要的动物特征
interface Feature {
  color: string;
  bark(): void;
}

// 定义动物类型名字
type name = 'cat' | 'dog'

// 子类必须要实现 Feature 接口的方法
// 这样我们就可以创建白色叫声喵喵喵的猫了
class Cat implements Feature {
  color = "白色";
  bark() {
    console.log(`${this.color} 喵喵喵`);
  }
}
// 创建 Dog 类
class Dog implements Feature {
  color = "黑色";
  bark() {
    console.log(`${this.color} 汪汪汪`);
  }
}
// 这就是一个动物工厂
class Animal {
  createAnimal(type: name) {
    switch (type) {
      case 'cat':
        return new Cat();
      case 'dog':
        return new Dog();
    }
  }
}

const animal = new Animal();
const cat = animal.createAnimal('cat');
const dog = animal.createAnimal('dog');

cat.bark()
dog.bark()

export default Animal