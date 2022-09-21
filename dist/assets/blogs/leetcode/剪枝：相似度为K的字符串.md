# 题目

[854. 相似度为 K 的字符串 题解 - 力扣（LeetCode）](https://leetcode.cn/problems/k-similar-strings/solution/)

> 对于某些非负整数 k ，如果交换 s1 中两个字母的位置恰好 k 次，能够使结果字符串等于 s2 ，则认为字符串 s1 和 s2 的 相似度为 k 。
>
> 给你两个字母异位词 s1 和 s2 ，返回 s1 和 s2 的相似度 k 的最小值。
>
> 示例 1：
>
> ```
> 输入：s1 = "ab", s2 = "ba"
> 输出：1
> ```
>
> 示例 2：
>
> ```
> 输入：s1 = "abc", s2 = "bca"
> 输出：2
> ```
>
>
> 提示：
>
> ```
> 1 <= s1.length <= 20
> s2.length == s1.length
> s1 和 s2  只包含集合 {'a', 'b', 'c', 'd', 'e', 'f'} 中的小写字母
> s2 是 s1 的一个字母异位词
> ```
>
> 来源：力扣（LeetCode）
> 链接：https://leetcode.cn/problems/k-similar-strings
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

# 解法1：广度优先搜索

对`s1`进行变化；

每当遇到一个不相似位置`s1[i]!=s2[i]`，尝试使用后续一个与`s2[i]`相同的元素进行替换，并将变换后的新`s1`加入到队列中，这样一旦队列中发现一个`s1`状态与`s2`相等时，当前步数肯定是最小的；

## 代码

```c++
class Solution {
public:
    int kSimilarity(string s1, string s2) {
        int n = s1.size();
        queue<pair<string, int>> qu;
        unordered_set<string> visit;
        qu.emplace(s1, 0);
        visit.emplace(s1);
        for (int step = 0;; step++) {
            int sz = qu.size();
            for (int i = 0; i < sz; i++) {
                auto [cur, pos] = qu.front();
                qu.pop();
                if (cur == s2) {
                    return step;
                }
                while (pos < n && cur[pos] == s2[pos]) {
                    pos++;
                }
                for (int j = pos + 1; j < n; j++) {
                    if (cur[j] != s2[j] && cur[j] == s2[pos]) { // 剪枝，只在 cur[j] != s2[j] 时去交换
                        swap(cur[pos], cur[j]);
                        if (!visit.count(cur)) {
                            visit.emplace(cur);
                            qu.emplace(cur, pos + 1);
                        }
                      	// 变会原始状态，继续尝试其他替换方案
                        swap(cur[pos], cur[j]);
                    }
                }
            }
        }
    }
};

```

