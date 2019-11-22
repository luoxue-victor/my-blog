abstract class Feature {
  abstract color: string;
  abstract bark(): void;
}

// 枚举可以使用的动物类型
enum animalType {
  'cat',
  'dog'
}

interface c {}

type a = c

// 子类继承抽象类 Feature
// 这样我们就可以创建白色叫声喵喵喵的猫了
class Cat extends Feature {
  color = "白色";
  bark() {
    console.log(`${this.color} 喵喵喵`);
  }
}
// 创建 Dog 类
class Dog extends Feature {
  color = "黑色";
  bark() {
    console.log(`${this.color} 汪汪汪`);
  }
}
// 这就是一个动物工厂
class Animal {
  createAnimal(type: animalType) {
    switch (type) {
      case animalType.dog:
        return new Cat();
      case animalType.dog:
        return new Dog();
    }
  }
}

const animal = new Animal();
const cat = animal.createAnimal(animalType.cat);
const dog = animal.createAnimal(animalType.dog);

cat.bark()
dog.bark()

export default Animal
