function movingCount(threshold, rows, cols) {
    if(threshold === 0){
        return 1;
    }
    let map = new Map();
    for (let i = 0; i < 10; i++) {
        map.set(i, i);
    }
    let m = Math.max(rows, cols);
    for (let i = 10; i < m; i++) {
        map.set(i, map.get(Math.floor(i / 10)) + map.get(i % 10));
    }
    console.log(map);
    let avail = [[0, 0]];
    let visited = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
    visited[0][0] = 1;
    let res = 0;
    while (avail.length) {
        let n = avail.length;
        res += n;
        console.log(JSON.stringify(avail), avail.length, res);
        while (n--) {
            let [x, y] = avail.shift();
            if (x - 1 >= 0 && !visited[x - 1][y] && map.get(x-1) + map.get(y) <= threshold) {
                visited[x-1][y] = 1;
                avail.push([x - 1, y]);
            }
            if (x + 1 < rows && !visited[x + 1][y] && map.get(x+1) + map.get(y) <= threshold) {
                visited[x+1][y] = 1;
                avail.push([x + 1, y]);
            }
            if (y - 1 >= 0 && !visited[x][y - 1] && map.get(x) + map.get(y-1) <= threshold) {
                visited[x][y-1] = 1;
                avail.push([x, y - 1]);
            }
            if (y + 1 < cols && !visited[x][y + 1] && map.get(x) + map.get(y+1) <= threshold) {
                visited[x][y+1] = 1;
                avail.push([x, y + 1]);
            }
        }
    }
    return res;
}

movingCount(15, 20, 20);
