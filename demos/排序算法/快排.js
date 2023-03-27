function quickSort(nums, left, right) {
    console.log('start', left, right);
    let t = nums[left];
    if (left < right) {
        let r = right;
        let l = left; // 为什么从左边界开始，因为可能位置不会发生变化
        while(l < r){
            while(nums[r] >= t && r > l){  // 如果找不到比t小的元素，会到达l
                r--;
            }
            while(nums[l] <= t && l < r){  // 如果找不到比t大的元素，会到达r，保证左边的元素都小于t
                l++;
            }
            // 极端情况l不动，r到达l（右边所有元素都大于t）
            // 退出外层循环 自身跟自身交互

            // 找到了两个元素，他们互换
            if (l < r){
                let tmp = nums[r];
                nums[r] = nums[l];
                nums[l] = tmp;
            }
            console.log(nums);
        }
        // 只找到了一个元素（一定比t小或比t大）
        let tmp = nums[l];
        nums[l] = t;
        nums[left] = tmp;
        console.log('end this', nums);
        quickSort(nums, left, l-1);
        quickSort(nums, l+1, right);
    }
}

let nums = [2,3,5,-1,2,5,6,3];
nums = [0,1,2,3,4]
nums = [4, 3, 2, 1, 0]
nums = [1]
quickSort(nums, 0, nums.length-1);
console.log(nums);