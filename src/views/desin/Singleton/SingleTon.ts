class Singleton {
  private static instance = null;
  // 获取实例方法
  static getInstance() {
    return this.instance || (this.instance = new Singleton());
  }
}

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1, instance2)
console.log(instance1 instanceof Singleton, instance2 instanceof Singleton)
console.log(instance1 == instance2); 

export default Singleton