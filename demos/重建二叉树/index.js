function binaryTree(preStr, midStr) {
    const n = preStr.length;
    function buildTree(iPre, ePre, iMid, eMid) {
        let tChar = preStr[iPre];
        let node = { val: tChar, left: null, right: null };
        let tMid = midStr.indexOf(tChar);
        if (tMid > iMid) {
            console.log(`left: ${iPre+1}->${iPre + tMid - iMid}`);
            node.left = buildTree(iPre + 1, iPre + tMid - iMid, iMid, tMid - 1);
        }
        if (tMid < eMid) {
            console.log(`right: ${iPre + tMid - iMid + 1}->${ePre}`);
            node.right = buildTree(iPre + tMid - iMid + 1, ePre, tMid + 1, eMid);
        }
        return node;
    }
    const head = buildTree(0, n - 1, 0, n - 1);
    let res = [];
    // console.log(head);
    function visitTree(node) {
        // console.log(node.val);
        if (node === null) {
            return;
        }
        if (node.left !== null) {
            visitTree(node.left);
        }
        if (node.right !== null) {
            visitTree(node.right);
        }
        res.push(node.val);
    }
    visitTree(head);
    return res.join('');
}

binaryTree('ABDHEICFJKG', 'DHBEIAJFKCGN');