// index.js

// ---------- Data structures ----------
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Build a binary tree from a level-order array like [3,9,20,null,null,15,7]
function buildTree(arr) {
    if (!arr || arr.length === 0) return null;
    const nodes = arr.map(v => (v == null ? null : new TreeNode(v)));
    let j = 1;
    for (let i = 0; i < nodes.length && j < nodes.length; i++) {
        if (!nodes[i]) continue;
        nodes[i].left = nodes[j++] ?? null;
        if (j < nodes.length) nodes[i].right = nodes[j++] ?? null;
    }
    return nodes[0];
}

// ---------- 1) Recursive DFS ----------
function maxDepthDFS(root) {
    // TODO:
    // Base case: if root is null -> ?
    // Otherwise: depth = 1 + max(depth(left), depth(right))
    // return depth

    if (root == null) return 0;
    let leftDepth = maxDepthDFS(root.left);
    let rightDepth = maxDepthDFS(root.right);
    const depth = Math.max(leftDepth, rightDepth);
    return (1 + depth)
}

// ---------- 2) BFS (level-order) ----------
function maxDepthBFS(root) {
    // TODO:
    // If root is null -> 0
    // Use a queue initialized with [root]
    // For each level:
    //   - get the current queue length (level size)
    //   - process exactly that many nodes, enqueuing their children
    //   - after the loop for this level, increase depth by 1
    // return depth

    if (root == null) {
        return 0;
    }

    let queue = [root];
    let depth = 0

    while (
        queue.length
    ) {
        //adding child of each head element in the queue to the queue
        const levelsize = queue.length;
        for (let i = 0; i < levelsize; i++) {
            const node = queue.shift();
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        depth++;
    }

    return depth;
}

// ---------- 3) Iterative DFS (stack) ----------
function maxDepthDFSIterative(root) {
    // TODO:
    // If root is null -> 0
    // Use a stack of pairs: [node, depth], start with [root, 1]
    // While stack not empty:
    //   - pop a pair
    //   - update maxDepth
    //   - push children with depth+1 if they exist
    // return maxDepth
    if (!root) { return 0 }
    let stack = [[root, 1]]
    let depth = 0;
    while (stack.length) {
        const [node, dep] = stack.pop();
        if (node == null) continue;

        depth = Math.max(depth, dep);
        if (node.left) { stack.push([node.left,dep+1]) };
        if (node.right) { stack.push([node.right,dep+1]) }
    }
    return depth;
}

// ---------- Quick local tests ----------
function testAll(arr, expected) {
    const root = buildTree(arr);
    const r1 = maxDepthDFS(root);
      const r2 = maxDepthBFS(root);
      const r3 = maxDepthDFSIterative(root);
    console.log({ expected, r1, r2, r3, arr });
    console.assert(r1 === expected, "DFS recursive failed");
      console.assert(r2 === expected, "BFS failed");
      console.assert(r3 === expected, "DFS iterative failed");
}

// Classic example: depth = 3
testAll([3, 9, 20, null, null, 15, 7], 3);

// Empty tree: depth = 0
testAll([], 0);

// Right-skewed: depth = 3
testAll([1, null, 2, null, 3], 3);

// Balanced-ish: depth = 3
testAll([1, 2, 3, 4, null, null, 5], 3);

console.log("If no assertion errors, you're good!");
