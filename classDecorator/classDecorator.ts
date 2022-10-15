import 'reflect-metadata'

interface IUserService {
  users: number;
  getUsersInDataBase(): number;
}

function CreatedAt(target: Function) {
  target.prototype.createdAt = new Date();
}

function CreatedAt2<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    public createdAt = new Date();
  } 
}

function ErrorInterceptor(opts: {rethrow: boolean}) {
  return (
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<(...any: any[]) => any>
  ): TypedPropertyDescriptor<(...any: any[]) => any> | void  => {
    const oldValue = descriptor.value;
    descriptor.value = (...any: any[]) => {
      try {
        return oldValue?.apply(target, any);
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
          if (opts.rethrow) {
            throw new Error('Ошибка перехвачена');
          }
        }
      }
    }
  }
}

@CreatedAt
@CreatedAt2
class UserService implements IUserService {

  @Max(100)
  users: number = 100;
  createdAt: Date;
  private _admins: number;
  
  @ErrorInterceptor({rethrow: true})
  getUsersInDataBase(): number {
    throw new Error('Получай ошибку');
  }

  @Validate()
  setAdminsInDataBase(@Positive() num: number) {
    this._admins = num;
  }

  getAdminsInDataBase() {
    return this._admins;
  }
}

function Positive() {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    console.log(Reflect.getOwnMetadata('design:type', target, propertyKey));
    console.log(Reflect.getOwnMetadata('design:paramtypes', target, propertyKey));
    console.log(Reflect.getOwnMetadata('design:returntype', target, propertyKey));
    let existParams: number[] = Reflect.getOwnMetadata('key', target, propertyKey) || [];
    existParams.push(parameterIndex);
    Reflect.defineMetadata('key', existParams, target, propertyKey);
  }
}

function Validate() {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...any: any[]) => any>
  ): TypedPropertyDescriptor<(...any: any[]) => any> | void  => {
    const oldValue = descriptor.value;
    descriptor.value = (...args: any[]) => {
      let positiveParams: number[] = Reflect.getOwnMetadata('key', target, propertyKey);
      if(positiveParams) {
        for (let index of positiveParams) {
          if (args[index] < 0) {
            throw new Error('Число должно быть больше нуля');
          }
        }
      }
      return oldValue?.apply(target, args)
    }
  }
}

function Max(max: number) {
  return (
  target: Object,
  propertyKey: string | symbol,
  ) => {
    let value: number;
    const setter = function (newValue: number) {
      if (newValue > max) {
        console.log(`Нельзя установить значение больше ${max}`)
      } else {
        value = newValue;
      }
    }

    const getter = function () {
      return value;
    }

    Object.defineProperty(target, propertyKey, {
      set: setter,
      get: getter,
    })
  }
}

const userService = new UserService();
console.log(userService.createdAt);
// user.getUsersInDataBase();
userService.users = 1;
console.log(userService.users);
userService.users = 1000;

console.log(userService.setAdminsInDataBase(20));
console.log(userService.getAdminsInDataBase())
console.log(userService.setAdminsInDataBase(-1));

