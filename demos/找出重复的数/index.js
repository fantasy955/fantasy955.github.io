function findNum(nums) {
    const n = nums.length;
    let res = -1;
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i) {
            let to = nums[i];
            let tmp = nums[to];
            if(nums[to] === nums[i]){
                res = nums[i];
                break;
            }
            nums[to] = nums[i];
            nums[i] = tmp;
            console.log(`swap ${i} with ${to}`)
        }
        console.log(nums);
    }
    console.log(res);
}

const arr = new Array(20).fill(0).map((_, i) => i);
arr[0] = 3;

function shuffle(nums) {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        let t = Math.random() * (n - 1);
        t = t.toFixed(0);
        [nums[i], nums[t]] = [nums[t], nums[i]];
    }
}
shuffle(arr)
console.log(arr)
findNum(arr);