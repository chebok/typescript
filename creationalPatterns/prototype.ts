interface Prototype<T> {
  clone(): T
}

class UserHistory implements Prototype<UserHistory> {
  createdAt: Date;
  constructor(public email: string, public name: string) {
    this.createdAt = new Date();
  }

  clone(): UserHistory {
    let target = new UserHistory(this.email, this.name);
    target.createdAt = this.createdAt;
    return target;
  }
}

const user = {
  name: 'Vovan' as const,
  email: 'vovan@mail',
}

const userHistory1 = new UserHistory(user.email, user.name);
const userHistory2 = userHistory1.clone();
console.log(userHistory1.createdAt, userHistory2.createdAt);
