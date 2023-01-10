# 题目

[698. 划分为k个相等的子集 - 力扣（LeetCode）](https://leetcode.cn/problems/partition-to-k-equal-sum-subsets/)

> 给定一个整数数组 `nums` 和一个正整数 `k`，找出是否有可能把这个数组分成 `k` 个非空子集，其总和都相等。

> 示例 1：
>
> 输入： nums = [4, 3, 2, 3, 5, 2, 1], k = 4
> 输出： True
> 说明： 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。
> 示例 2:
>
> 输入: nums = [1,2,3,4], k = 3
> 输出: false
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/partition-to-k-equal-sum-subsets
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

# 分析

- 先判断数组大小以及能否整除，去除掉一部分简单数据；
- 将数组重排序，进行有序遍历；

最开始考虑从大到小进行组合，能够通过160/162的用例，但这种情况明显不能充分体现所有可能，因此需要用到回溯算法

# 错误解法

```c++
class Solution {
public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int n = nums.size();
        int sum = 0;
        for(int i=0; i<n; i++){
            sum += nums[i];
        }
        int partSum = sum / k;
        sort(nums.begin(), nums.end());
        if (sum % k != 0 || nums[n-1]>partSum){
            return false;
        }
        vector<bool> used(n, false);
        int end = n;
        while (end >0){
            end--;
            if (used[end] == true){
                continue;
            }
            used[end] = true;
            if (nums[end] == partSum){
                continue;
            }
            if (check(partSum, nums, used, end, nums[end]) == false){
                return false;
            }
        }
        for(int i=0; i<n; i++){
            if (used[i] == false){
                return false;
            }
        }

        return true;
    }
    bool check(int target, vector<int>& nums, vector<bool>& used, int end, int tmpSum){
        for(int i=end-1; i>=0; i--){
            if (used[i] == true){
                continue;
            }
            used[i] = true;
            if (tmpSum + nums[i] == target){
                return true;
            }else{
                if (check(target, nums, used, i, tmpSum+nums[i]) == true){
                    return true;
                }
                used[i] = false;
            }
        }
        return false;
    }
};
```

# 回溯

```c++
class Solution {
public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int n = nums.size();
        int sum = 0;
        for(int i=0; i<n; i++){
            sum += nums[i];
        }
        int partSum = sum / k;
        sort(nums.begin(), nums.end());
        if (sum % k != 0 || nums[n-1]>partSum){
            return false;
        }
        vector<int> sub(k, partSum);
        return check(nums, n-1, k, sub);
    }
    bool check(vector<int>& nums, int cur, int& k, vector<int>& sub){
        if (cur < 0){
            return true;
        }
        for(int j=0; j<k; j++){
            if(j>0 && sub[j] == sub[j-1]){  // 如果当前状态与前者状态相同，则不需要遍历；因为本来就是前一个状态已经无法继续，才到达当前状态；
                continue;
            }
            if(sub[j]>=nums[cur]){  // cur可以放入桶中
                sub[j]-=nums[cur];
                if(check(nums, cur-1, k, sub)){  // 尝试下一个数字
                    return true;
                }
                sub[j]+=nums[cur];  // 换一个数字进行尝试
            }
        }
        // 如果满足条件，对于每个cur，其必定属于某一个sub；
        // 结束上述循环，没有返回true，说明存在一个cur不属于任何一个sub；
        // 因此返回false；
        // 同理，当遍历到-1时，说明n-1到0的数字都满足条件，能够放入一个sub中，因此返回true
        return false;
    }
};
```

