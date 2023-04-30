let input = [
    [0, 1],
    [3, 2],
    [2, 1],
]

let set = new Set();
let map = new Map();

for (let i = 0; i < 4; i++) {
    set.add(i);
    map.set(i, []);
}

for (let item of input) {
    let [x, y] = item;
    map.get(x).push(y);
    map.get(y).push(x);
}

let node = 0;
set.delete(0);
let tree = new Map();
tree.set(0, []);
let visited = new Set();
visited.add(0);

// eslint-disable-next-line no-constant-condition
while (true) {
    for (let idx of map.get(node)) {
        if (!visited.has(idx)) {
            tree.get(node).push(idx);
            visited.add(idx);
        }
    }
    let flag = false;
    for (let i = 0; i < 4; i++) {
        if (set.has(i) && map.get(i).length) {
            node = i;
            flag = true;
            set.delete(i);
            tree.set(i, []);
            visited.add(i);
            break;
        }
    }
    if (!flag) {
        break;
    }
}

console.log(tree, JSON.stringify(tree));
console.log('end');
