"use strict";
const newToString = (data) => {
    switch (typeof data) {
        case 'string':
        case 'number':
        case 'bigint':
        case 'symbol':
        case 'boolean':
        case 'function':
            return data.toString();
        case 'object':
            return data === null ? undefined : data.toString();
        default:
            return undefined;
    }
};
console.log(newToString(3));
console.log(newToString([1, 2, 3]));
console.log(newToString(true));
console.log(newToString(null));
