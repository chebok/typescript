"use strict";
class ObjWithId {
}
const data = [
    { id: 2, name: 'Петя' },
    { id: 1, name: 'Вася' },
    { id: 3, name: 'Надя' },
];
const sorting = (data, dir = 'des') => {
    if (dir === 'asc') {
        data.sort(({ id: id1 }, { id: id2 }) => id1 - id2);
    }
    else {
        data.sort(({ id: id1 }, { id: id2 }) => id2 - id1);
    }
    return data;
};
console.log(sorting(data, 'asc'));
console.log(sorting(data));
