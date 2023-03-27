function buildHeap(nums, n) {
    for (let i = Math.floor((n-1) / 2); i >= 0; i--) {
        maxHeap(nums, i, n);
        console.log(i, nums)
    }
}

function maxHeap(nums, i, n) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let cur = nums[i];
    if (left <= n) {
        if (nums[left] > cur) { // 子节点的头节点一定是最大的元素（已经是大顶堆了
            nums[i] = nums[left];
            nums[left] = cur;
            cur = nums[i];
            maxHeap(nums, left, n);
        }
    }
    if (right <= n) {
        if (nums[right] > cur) {
            nums[i] = nums[right];
            nums[right] = cur;
            cur = nums[i];
            maxHeap(nums, right, n);
        }
    }
}

let nums = [2, 3, 5, -1, 2, 5, 6, 3];
// nums = [0, 1, 2, 3, 4]
// nums = [4, 3, 2, 1, 0]
// nums = [1]
buildHeap(nums, nums.length - 1);
console.log(nums);