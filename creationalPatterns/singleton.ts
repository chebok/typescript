class MyMap {
  private static instance: MyMap;
  map: Map<number, string> = new Map();
  private constructor() {}

  clean() {
    this.map = new Map();
  }

  public static get(): MyMap {
    if (!MyMap.instance) {
      MyMap.instance = new MyMap();
    }
    return MyMap.instance;
  }
}

class Service1 {
  addMap(key: number, value: string) {
    const myMap = MyMap.get();
    myMap.map.set(key, value);
  }
}

class Service2 {
  getKeys(key: number) {
    const myMap = MyMap.get();
    console.log(myMap.map.get(key));
    myMap.clean();
    console.log(myMap.map.get(key));
  }
}

const service1 = new Service1();
const service2 = new Service2();
service1.addMap(2, 'asd');
service2.getKeys(2);