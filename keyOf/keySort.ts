type key = string | symbol | number;
interface IGroup<T> {
  [key: key]: T[];
}

const keySort = <T extends Record<keyof T, key>>(data: Array<T>, key: keyof T): IGroup<T>=> {
  const values = data.map((el) => el[key]);
  const uniqValues = [...new Set(values)];
  const init: IGroup<T> = {};
  const result = uniqValues.reduce((acc, value) => {
    acc[value] = data.filter((element) => element[key] === value);
    return acc;
  }, init)
  return result;
};

const dataBase = [
	{ group: 1, name: 'a' },
	{ group: 1, name: 'b' },
	{ group: 2, name: 'd' },
  { group: 2, name: 'g' },
  { group: 3, name: 'g' },
  { group: 2, name: 'c' },
];

console.log(keySort(dataBase, 'group'));