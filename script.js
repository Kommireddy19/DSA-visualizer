/* =========================
   PAGE + NAVIGATION SYSTEM
========================= */
const pages = document.querySelectorAll(".page");
const dsListContainer = document.getElementById("dsListContainer");
const dsListTitle = document.getElementById("dsListTitle");
const visualizerTitle = document.getElementById("visualizerTitle");
const visualizerPanel = document.getElementById("visualizerPanel");

let currentCategory = "";
let currentDS = "";

/* Data structure lists */
const linearDS = [
  { name: "Array", key: "array" },
  { name: "Stack", key: "stack" },
  { name: "Queue", key: "queue" },
  { name: "Linked List", key: "linkedlist" }
];

const nonlinearDS = [
  { name: "Binary Search Tree", key: "bst" },
  { name: "Heap", key: "heap" },
  { name: "Graph", key: "graph" },
  { name: "Trie", key: "trie" }
];

function showPage(pageId) {
  pages.forEach(page => page.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

function openCategory(category) {
  currentCategory = category;
  showPage("dsListPage");
  dsListContainer.innerHTML = "";

  let data = [];
  if (category === "linear") {
    dsListTitle.textContent = "Linear Data Structures";
    data = linearDS;
  } else {
    dsListTitle.textContent = "Non-Linear Data Structures";
    data = nonlinearDS;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${item.name}</h2>
      <p>Click to open ${item.name} visualizer</p>
    `;
    card.onclick = () => openVisualizer(item.key, item.name);
    dsListContainer.appendChild(card);
  });
}

function openVisualizer(dsKey, dsName) {
  currentDS = dsKey;
  visualizerTitle.textContent = dsName;
  showPage("visualizerPage");

  if (dsKey === "array") renderArrayUI();
  else if (dsKey === "stack") renderStackUI();
  else if (dsKey === "queue") renderQueueUI();
  else if (dsKey === "linkedlist") renderLinkedListUI();
  else if (dsKey === "bst") renderBSTUI();
  else if (dsKey === "heap") renderHeapUI();
  else if (dsKey === "graph") renderGraphUI();
  else if (dsKey === "trie") renderTrieUI();
}

/* =========================
   ARRAY VISUALIZER
========================= */
let arrayData = [];

function renderArrayUI() {
  visualizerPanel.innerHTML = `
    <div class="visualizer-box">
      <div class="controls">
        <input type="number" id="arrayValue" placeholder="Enter value" />
        <input type="number" id="arrayIndex" placeholder="Enter index" />
        <button class="action-btn" onclick="arrayInsertBeginning()">Insert Beginning</button>
        <button class="action-btn" onclick="arrayInsertEnd()">Insert End</button>
        <button class="action-btn" onclick="arrayInsertAtIndex()">Insert At Index</button>
        <button class="action-btn" onclick="arrayDeleteByIndex()">Delete By Index</button>
        <button class="action-btn" onclick="arrayDeleteByValue()">Delete By Value</button>
        <button class="action-btn" onclick="arraySearch()">Search</button>
        <button class="action-btn" onclick="arrayUpdate()">Update</button>
        <button class="action-btn" onclick="arrayReverse()">Reverse</button>
        <button class="action-btn" onclick="arrayReset()">Reset</button>
      </div>

      <div id="arrayOutput" class="array-container"></div>
      <div id="arrayMessage" class="message"></div>

      <div class="complexity-box">
        <h2>Array Operations</h2>
        <p><strong>Insert / Delete:</strong> O(n)</p>
        <p><strong>Search:</strong> O(n)</p>
        <p><strong>Update:</strong> O(1)</p>
        <p><strong>Reverse:</strong> O(n)</p>
      </div>
    </div>
  `;
  drawArray();
}

function drawArray(highlightIndex = -1) {
  const output = document.getElementById("arrayOutput");
  if (!output) return;

  output.innerHTML = "";

  if (arrayData.length === 0) {
    output.innerHTML = `<p class="empty-text">Array is empty</p>`;
    return;
  }

  arrayData.forEach((value, index) => {
    const box = document.createElement("div");
    box.className = "array-box";
    if (index === highlightIndex) box.style.background = "#16a34a";
    box.innerHTML = `${value}<span>${index}</span>`;
    output.appendChild(box);
  });
}

function arrayMsg(text, color = "#dc2626") {
  const msg = document.getElementById("arrayMessage");
  msg.textContent = text;
  msg.style.color = color;
}

function getArrayValue() {
  return document.getElementById("arrayValue").value.trim();
}

function getArrayIndex() {
  return document.getElementById("arrayIndex").value.trim();
}

function arrayInsertBeginning() {
  const value = getArrayValue();
  if (value === "") {
    arrayMsg("Please enter a value.");
    return;
  }
  arrayData.unshift(Number(value));
  drawArray(0);
  arrayMsg(`Inserted ${value} at beginning`, "green");
}

function arrayInsertEnd() {
  const value = getArrayValue();
  if (value === "") {
    arrayMsg("Please enter a value.");
    return;
  }
  arrayData.push(Number(value));
  drawArray(arrayData.length - 1);
  arrayMsg(`Inserted ${value} at end`, "green");
}

function arrayInsertAtIndex() {
  const value = getArrayValue();
  const index = getArrayIndex();

  if (value === "" || index === "") {
    arrayMsg("Please enter both value and index.");
    return;
  }

  const i = Number(index);
  if (i < 0 || i > arrayData.length) {
    arrayMsg("Invalid index.");
    return;
  }

  arrayData.splice(i, 0, Number(value));
  drawArray(i);
  arrayMsg(`Inserted ${value} at index ${i}`, "green");
}

function arrayDeleteByIndex() {
  const index = getArrayIndex();
  if (index === "") {
    arrayMsg("Please enter index.");
    return;
  }

  const i = Number(index);
  if (i < 0 || i >= arrayData.length) {
    arrayMsg("Invalid index.");
    return;
  }

  const deleted = arrayData[i];
  arrayData.splice(i, 1);
  drawArray();
  arrayMsg(`Deleted ${deleted} from index ${i}`, "green");
}

function arrayDeleteByValue() {
  const value = getArrayValue();
  if (value === "") {
    arrayMsg("Please enter value.");
    return;
  }

  const v = Number(value);
  const idx = arrayData.indexOf(v);
  if (idx === -1) {
    arrayMsg(`${v} not found.`);
    return;
  }

  arrayData.splice(idx, 1);
  drawArray();
  arrayMsg(`Deleted value ${v}`, "green");
}

function arraySearch() {
  const value = getArrayValue();
  if (value === "") {
    arrayMsg("Please enter value to search.");
    return;
  }

  const v = Number(value);
  const idx = arrayData.indexOf(v);

  if (idx === -1) {
    drawArray();
    arrayMsg(`${v} not found.`);
  } else {
    drawArray(idx);
    arrayMsg(`${v} found at index ${idx}`, "green");
  }
}

function arrayUpdate() {
  const value = getArrayValue();
  const index = getArrayIndex();

  if (value === "" || index === "") {
    arrayMsg("Please enter both new value and index.");
    return;
  }

  const i = Number(index);
  if (i < 0 || i >= arrayData.length) {
    arrayMsg("Invalid index.");
    return;
  }

  arrayData[i] = Number(value);
  drawArray(i);
  arrayMsg(`Updated index ${i} with ${value}`, "green");
}

function arrayReverse() {
  if (arrayData.length === 0) {
    arrayMsg("Array is empty.");
    return;
  }
  arrayData.reverse();
  drawArray();
  arrayMsg("Array reversed successfully.", "green");
}

function arrayReset() {
  arrayData = [];
  drawArray();
  arrayMsg("Array cleared successfully.", "green");
}

/* =========================
   STACK VISUALIZER
========================= */
let stackData = [];

function renderStackUI() {
  visualizerPanel.innerHTML = `
    <div class="visualizer-box">
      <div class="controls">
        <input type="number" id="stackValue" placeholder="Enter value" />
        <button class="action-btn" onclick="stackPush()">Push</button>
        <button class="action-btn" onclick="stackPop()">Pop</button>
        <button class="action-btn" onclick="stackPeek()">Peek</button>
        <button class="action-btn" onclick="stackIsEmpty()">isEmpty</button>
        <button class="action-btn" onclick="stackSize()">Size</button>
        <button class="action-btn" onclick="stackReset()">Reset</button>
      </div>

      <div id="stackOutput" class="stack-container"></div>
      <div id="stackMessage" class="message"></div>

      <div class="complexity-box">
        <h2>Stack Operations</h2>
        <p><strong>Push:</strong> O(1)</p>
        <p><strong>Pop:</strong> O(1)</p>
        <p><strong>Peek:</strong> O(1)</p>
        <p><strong>isEmpty:</strong> O(1)</p>
        <p><strong>Size:</strong> O(1)</p>
      </div>
    </div>
  `;
  drawStack();
}

function drawStack(highlightTop = false) {
  const output = document.getElementById("stackOutput");
  output.innerHTML = "";

  if (stackData.length === 0) {
    output.innerHTML = `<p class="empty-text">Stack is empty</p>`;
    return;
  }

  stackData.forEach((value, index) => {
    const box = document.createElement("div");
    box.className = "stack-box";
    box.textContent = value;

    if (highlightTop && index === stackData.length - 1) {
      box.style.background = "#16a34a";
    }

    output.appendChild(box);
  });
}

function stackMsg(text, color = "#dc2626") {
  const msg = document.getElementById("stackMessage");
  msg.textContent = text;
  msg.style.color = color;
}

function stackPush() {
  const value = document.getElementById("stackValue").value.trim();
  if (value === "") {
    stackMsg("Please enter a value.");
    return;
  }

  stackData.push(Number(value));
  drawStack(true);
  stackMsg(`Pushed ${value} into stack`, "green");
}

function stackPop() {
  if (stackData.length === 0) {
    stackMsg("Stack underflow.");
    return;
  }

  const popped = stackData.pop();
  drawStack();
  stackMsg(`Popped ${popped}`, "green");
}

function stackPeek() {
  if (stackData.length === 0) {
    stackMsg("Stack is empty.");
    return;
  }

  drawStack(true);
  stackMsg(`Top element is ${stackData[stackData.length - 1]}`, "green");
}

function stackIsEmpty() {
  stackMsg(stackData.length === 0 ? "Yes, stack is empty." : "No, stack is not empty.", "green");
}

function stackSize() {
  stackMsg(`Stack size is ${stackData.length}`, "green");
}

function stackReset() {
  stackData = [];
  drawStack();
  stackMsg("Stack cleared successfully.", "green");
}

/* =========================
   QUEUE VISUALIZER
========================= */
let queueData = [];

function renderQueueUI() {
  visualizerPanel.innerHTML = `
    <div class="visualizer-box">
      <div class="controls">
        <input type="number" id="queueValue" placeholder="Enter value" />
        <button class="action-btn" onclick="queueEnqueue()">Enqueue</button>
        <button class="action-btn" onclick="queueDequeue()">Dequeue</button>
        <button class="action-btn" onclick="queueFront()">Front</button>
        <button class="action-btn" onclick="queueRear()">Rear</button>
        <button class="action-btn" onclick="queueIsEmpty()">isEmpty</button>
        <button class="action-btn" onclick="queueSize()">Size</button>
        <button class="action-btn" onclick="queueReset()">Reset</button>
      </div>

      <div id="queueOutput" class="queue-container"></div>
      <div id="queueMessage" class="message"></div>

      <div class="complexity-box">
        <h2>Queue Operations</h2>
        <p><strong>Enqueue:</strong> O(1)</p>
        <p><strong>Dequeue:</strong> O(n) with array shift</p>
        <p><strong>Front / Rear:</strong> O(1)</p>
        <p><strong>isEmpty:</strong> O(1)</p>
        <p><strong>Size:</strong> O(1)</p>
      </div>
    </div>
  `;
  drawQueue();
}

function drawQueue(highlightIndex = -1) {
  const output = document.getElementById("queueOutput");
  output.innerHTML = "";

  if (queueData.length === 0) {
    output.innerHTML = `<p class="empty-text">Queue is empty</p>`;
    return;
  }

  queueData.forEach((value, index) => {
    const box = document.createElement("div");
    box.className = "queue-box";
    box.textContent = value;

    if (index === highlightIndex) {
      box.style.background = "#16a34a";
    }

    output.appendChild(box);
  });
}

function queueMsg(text, color = "#dc2626") {
  const msg = document.getElementById("queueMessage");
  msg.textContent = text;
  msg.style.color = color;
}

function queueEnqueue() {
  const value = document.getElementById("queueValue").value.trim();
  if (value === "") {
    queueMsg("Please enter a value.");
    return;
  }

  queueData.push(Number(value));
  drawQueue(queueData.length - 1);
  queueMsg(`Enqueued ${value}`, "green");
}

function queueDequeue() {
  if (queueData.length === 0) {
    queueMsg("Queue is empty.");
    return;
  }

  const removed = queueData.shift();
  drawQueue();
  queueMsg(`Dequeued ${removed}`, "green");
}

function queueFront() {
  if (queueData.length === 0) {
    queueMsg("Queue is empty.");
    return;
  }

  drawQueue(0);
  queueMsg(`Front element is ${queueData[0]}`, "green");
}

function queueRear() {
  if (queueData.length === 0) {
    queueMsg("Queue is empty.");
    return;
  }

  drawQueue(queueData.length - 1);
  queueMsg(`Rear element is ${queueData[queueData.length - 1]}`, "green");
}

function queueIsEmpty() {
  queueMsg(queueData.length === 0 ? "Yes, queue is empty." : "No, queue is not empty.", "green");
}

function queueSize() {
  queueMsg(`Queue size is ${queueData.length}`, "green");
}

function queueReset() {
  queueData = [];
  drawQueue();
  queueMsg("Queue cleared successfully.", "green");
}

/* =========================
   LINKED LIST VISUALIZER
========================= */
let linkedListData = [];

function renderLinkedListUI() {
  visualizerPanel.innerHTML = `
    <div class="visualizer-box">
      <div class="controls">
        <input type="number" id="llValue" placeholder="Enter value" />
        <input type="number" id="llIndex" placeholder="Enter index / position" />
        <button class="action-btn" onclick="llInsertBeginning()">Insert Beginning</button>
        <button class="action-btn" onclick="llInsertEnd()">Insert End</button>
        <button class="action-btn" onclick="llInsertAtIndex()">Insert At Index</button>
        <button class="action-btn" onclick="llDeleteBeginning()">Delete Beginning</button>
        <button class="action-btn" onclick="llDeleteEnd()">Delete End</button>
        <button class="action-btn" onclick="llDeleteByValue()">Delete By Value</button>
        <button class="action-btn" onclick="llDeleteByPosition()">Delete By Position</button>
        <button class="action-btn" onclick="llSearch()">Search</button>
        <button class="action-btn" onclick="llReverse()">Reverse</button>
        <button class="action-btn" onclick="llCount()">Count</button>
        <button class="action-btn" onclick="llReset()">Reset</button>
      </div>

      <div id="llOutput" class="linkedlist-container"></div>
      <div id="llMessage" class="message"></div>

      <div class="complexity-box">
        <h2>Linked List Operations</h2>
        <p><strong>Insert / Delete / Search:</strong> O(n)</p>
        <p><strong>Insert Beginning / Delete Beginning:</strong> O(1) conceptually</p>
        <p><strong>Reverse:</strong> O(n)</p>
        <p><strong>Count:</strong> O(1) using length property here</p>
      </div>
    </div>
  `;
  drawLinkedList();
}

function drawLinkedList(highlightIndex = -1) {
  const output = document.getElementById("llOutput");
  output.innerHTML = "";

  if (linkedListData.length === 0) {
    output.innerHTML = `<p class="empty-text">Linked List is empty</p>`;
    return;
  }

  linkedListData.forEach((value, index) => {
    const node = document.createElement("div");
    node.className = "node";

    const box = document.createElement("div");
    box.className = "node-box";
    box.textContent = value;

    if (index === highlightIndex) {
      box.style.background = "#16a34a";
    }

    node.appendChild(box);

    if (index !== linkedListData.length - 1) {
      const arrow = document.createElement("div");
      arrow.className = "arrow";
      arrow.textContent = "→";
      node.appendChild(arrow);
    } else {
      const nullText = document.createElement("div");
      nullText.className = "arrow";
      nullText.textContent = "→ NULL";
      node.appendChild(nullText);
    }

    output.appendChild(node);
  });
}

function llMsg(text, color = "#dc2626") {
  const msg = document.getElementById("llMessage");
  msg.textContent = text;
  msg.style.color = color;
}

function getLLValue() {
  return document.getElementById("llValue").value.trim();
}

function getLLIndex() {
  return document.getElementById("llIndex").value.trim();
}

function llInsertBeginning() {
  const value = getLLValue();
  if (value === "") {
    llMsg("Please enter a value.");
    return;
  }

  linkedListData.unshift(Number(value));
  drawLinkedList(0);
  llMsg(`Inserted ${value} at beginning`, "green");
}

function llInsertEnd() {
  const value = getLLValue();
  if (value === "") {
    llMsg("Please enter a value.");
    return;
  }

  linkedListData.push(Number(value));
  drawLinkedList(linkedListData.length - 1);
  llMsg(`Inserted ${value} at end`, "green");
}

function llInsertAtIndex() {
  const value = getLLValue();
  const index = getLLIndex();

  if (value === "" || index === "") {
    llMsg("Please enter both value and index.");
    return;
  }

  const i = Number(index);
  if (i < 0 || i > linkedListData.length) {
    llMsg("Invalid index.");
    return;
  }

  linkedListData.splice(i, 0, Number(value));
  drawLinkedList(i);
  llMsg(`Inserted ${value} at position ${i}`, "green");
}

function llDeleteBeginning() {
  if (linkedListData.length === 0) {
    llMsg("Linked List is empty.");
    return;
  }

  const removed = linkedListData.shift();
  drawLinkedList();
  llMsg(`Deleted ${removed} from beginning`, "green");
}

function llDeleteEnd() {
  if (linkedListData.length === 0) {
    llMsg("Linked List is empty.");
    return;
  }

  const removed = linkedListData.pop();
  drawLinkedList();
  llMsg(`Deleted ${removed} from end`, "green");
}

function llDeleteByValue() {
  const value = getLLValue();
  if (value === "") {
    llMsg("Please enter value.");
    return;
  }

  const v = Number(value);
  const idx = linkedListData.indexOf(v);

  if (idx === -1) {
    llMsg(`${v} not found.`);
    return;
  }

  linkedListData.splice(idx, 1);
  drawLinkedList();
  llMsg(`Deleted ${v}`, "green");
}

function llDeleteByPosition() {
  const index = getLLIndex();
  if (index === "") {
    llMsg("Please enter position.");
    return;
  }

  const i = Number(index);
  if (i < 0 || i >= linkedListData.length) {
    llMsg("Invalid position.");
    return;
  }

  const removed = linkedListData[i];
  linkedListData.splice(i, 1);
  drawLinkedList();
  llMsg(`Deleted ${removed} from position ${i}`, "green");
}

function llSearch() {
  const value = getLLValue();
  if (value === "") {
    llMsg("Please enter value.");
    return;
  }

  const v = Number(value);
  const idx = linkedListData.indexOf(v);

  if (idx === -1) {
    drawLinkedList();
    llMsg(`${v} not found.`);
  } else {
    drawLinkedList(idx);
    llMsg(`${v} found at position ${idx}`, "green");
  }
}

function llReverse() {
  if (linkedListData.length === 0) {
    llMsg("Linked List is empty.");
    return;
  }

  linkedListData.reverse();
  drawLinkedList();
  llMsg("Linked List reversed successfully.", "green");
}

function llCount() {
  llMsg(`Linked List contains ${linkedListData.length} node(s)`, "green");
}

function llReset() {
  linkedListData = [];
  drawLinkedList();
  llMsg("Linked List cleared successfully.", "green");
}

/* =========================
   BST VISUALIZER
========================= */
let bstData = [];

/* ---------- BST helper tree ---------- */
class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function buildBSTFromArray(arr) {
  let root = null;
  arr.forEach(v => {
    root = bstInsertNode(root, v);
  });
  return root;
}

function bstInsertNode(root, value) {
  if (!root) return new BSTNode(value);
  if (value < root.value) root.left = bstInsertNode(root.left, value);
  else if (value > root.value) root.right = bstInsertNode(root.right, value);
  return root;
}

function bstSearchNode(root, value) {
  if (!root) return false;
  if (root.value === value) return true;
  if (value < root.value) return bstSearchNode(root.left, value);
  return bstSearchNode(root.right, value);
}

function bstFindMinNode(root) {
  while (root && root.left) root = root.left;
  return root;
}

function bstDeleteNode(root, value) {
  if (!root) return null;

  if (value < root.value) {
    root.left = bstDeleteNode(root.left, value);
  } else if (value > root.value) {
    root.right = bstDeleteNode(root.right, value);
  } else {
    if (!root.left && !root.right) return null;
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    let minRight = bstFindMinNode(root.right);
    root.value = minRight.value;
    root.right = bstDeleteNode(root.right, minRight.value);
  }
  return root;
}

function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.value);
  inorder(root.right, result);
  return result;
}

function preorder(root, result = []) {
  if (!root) return result;
  result.push(root.value);
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}

function postorder(root, result = []) {
  if (!root) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.value);
  return result;
}

function renderBSTUI() {
  visualizerPanel.innerHTML = `
    <div class="visualizer-box">
      <div class="controls">
        <input type="number" id="bstValue" placeholder="Enter value" />
        <button class="action-btn" onclick="bstInsert()">Insert</button>
        <button class="action-btn" onclick="bstSearch()">Search</button>
        <button class="action-btn" onclick="bstDelete()">Delete</button>
        <button class="action-btn" onclick="bstShowInorder()">Inorder</button>
        <button class="action-btn" onclick="bstShowPreorder()">Preorder</button>
        <button class="action-btn" onclick="bstShowPostorder()">Postorder</button>
        <button class="action-btn" onclick="bstFindMin()">Min</button>
        <button class="action-btn" onclick="bstFindMax()">Max</button>
        <button class="action-btn" onclick="bstReset()">Reset</button>
      </div>

      <div id="bstOutput" class="structure-output"></div>
      <div id="bstMessage" class="message"></div>

      <div class="complexity-box">
        <h2>BST Operations</h2>
        <p><strong>Insert / Search / Delete:</strong> O(log n) average, O(n) worst</p>
        <p><strong>Traversals:</strong> O(n)</p>
      </div>
    </div>
  `;
  drawBST();
}

function drawBST(extraText = "") {
  const output = document.getElementById("bstOutput");

  if (bstData.length === 0) {
    output.textContent = "BST is empty";
    return;
  }

  const root = buildBSTFromArray(bstData);
  const inorderVals = inorder(root, []).join("  ");
  output.textContent =
    "BST Elements (Inorder Sorted):\n\n" +
    inorderVals +
    (extraText ? `\n\n${extraText}` : "");
}

function bstMsg(text, color = "#dc2626") {
  const msg = document.getElementById("bstMessage");
  msg.textContent = text;
  msg.style.color = color;
}

function bstInsert() {
  const value = document.getElementById("bstValue").value.trim();
  if (value === "") {
    bstMsg("Please enter a value.");
    return;
  }

  const v = Number(value);
  if (bstData.includes(v)) {
    bstMsg(`${v} already exists in BST.`);
    return;
  }

  bstData.push(v);
  drawBST();
  bstMsg(`Inserted ${v} into BST`, "green");
}

function bstSearch() {
  const value = document.getElementById("bstValue").value.trim();
  if (value === "") {
    bstMsg("Please enter a value.");
    return;
  }

  const v = Number(value);
  const root = buildBSTFromArray(bstData);
  if (bstSearchNode(root, v)) {
    drawBST(`Found ${v} in BST`);
    bstMsg(`${v} found in BST`, "green");
  } else {
    drawBST();
    bstMsg(`${v} not found in BST`);
  }
}

function bstDelete() {
  const value = document.getElementById("bstValue").value.trim();
  if (value === "") {
    bstMsg("Please enter a value.");
    return;
  }

  const v = Number(value);
  if (!bstData.includes(v)) {
    bstMsg(`${v} not found in BST.`);
    return;
  }

  let root = buildBSTFromArray(bstData);
  root = bstDeleteNode(root, v);
  bstData = inorder(root, []);
  drawBST();
  bstMsg(`Deleted ${v} from BST`, "green");
}

function bstShowInorder() {
  if (bstData.length === 0) {
    bstMsg("BST is empty.");
    return;
  }
  const root = buildBSTFromArray(bstData);
  const result = inorder(root, []).join(" → ");
  drawBST(`Inorder: ${result}`);
  bstMsg("Displayed inorder traversal", "green");
}

function bstShowPreorder() {
  if (bstData.length === 0) {
    bstMsg("BST is empty.");
    return;
  }
  const root = buildBSTFromArray(bstData);
  const result = preorder(root, []).join(" → ");
  drawBST(`Preorder: ${result}`);
  bstMsg("Displayed preorder traversal", "green");
}

function bstShowPostorder() {
  if (bstData.length === 0) {
    bstMsg("BST is empty.");
    return;
  }
  const root = buildBSTFromArray(bstData);
  const result = postorder(root, []).join(" → ");
  drawBST(`Postorder: ${result}`);
  bstMsg("Displayed postorder traversal", "green");
}

function bstFindMin() {
  if (bstData.length === 0) {
    bstMsg("BST is empty.");
    return;
  }
  const root = buildBSTFromArray(bstData);
  const minNode = bstFindMinNode(root);
  drawBST(`Minimum value: ${minNode.value}`);
  bstMsg(`Minimum value is ${minNode.value}`, "green");
}

function bstFindMax() {
  if (bstData.length === 0) {
    bstMsg("BST is empty.");
    return;
  }
  const root = buildBSTFromArray(bstData);
  let curr = root;
  while (curr.right) curr = curr.right;
  drawBST(`Maximum value: ${curr.value}`);
  bstMsg(`Maximum value is ${curr.value}`, "green");
}

function bstReset() {
  bstData = [];
  drawBST();
  bstMsg("BST cleared successfully.", "green");
}

/* =========================
   HEAP VISUALIZER (MAX HEAP)
========================= */
let heapData = [];

function renderHeapUI() {
  visualizerPanel.innerHTML = `
    <div class="visualizer-box">
      <div class="controls">
        <input type="number" id="heapValue" placeholder="Enter value" />
        <button class="action-btn" onclick="heapInsert()">Insert</button>
        <button class="action-btn" onclick="heapDeleteRoot()">Delete Root</button>
        <button class="action-btn" onclick="heapPeek()">Peek Root</button>
        <button class="action-btn" onclick="heapReset()">Reset</button>
      </div>

      <div id="heapOutput" class="structure-output"></div>
      <div id="heapMessage" class="message"></div>

      <div class="complexity-box">
        <h2>Heap Operations (Max Heap)</h2>
        <p><strong>Insert:</strong> O(log n)</p>
        <p><strong>Delete Root:</strong> O(log n)</p>
        <p><strong>Peek Root:</strong> O(1)</p>
      </div>
    </div>
  `;
  drawHeap();
}

function drawHeap(extraText = "") {
  const output = document.getElementById("heapOutput");

  if (heapData.length === 0) {
    output.textContent = "Heap is empty";
    return;
  }

  output.textContent =
    "Heap Array Representation:\n\n" +
    heapData.join("  ") +
    "\n\nHeap Levels:\n" +
    heapTreeText(heapData) +
    (extraText ? `\n${extraText}` : "");
}

function heapTreeText(arr) {
  if (arr.length === 0) return "Heap is empty";

  let text = "";
  let level = 0;
  let i = 0;

  while (i < arr.length) {
    let count = Math.pow(2, level);
    let line = arr.slice(i, i + count).join("   ");
    text += line + "\n";
    i += count;
    level++;
  }
  return text;
}

function heapifyUp(arr, index) {
  while (index > 0) {
    let parent = Math.floor((index - 1) / 2);
    if (arr[parent] >= arr[index]) break;
    [arr[parent], arr[index]] = [arr[index], arr[parent]];
    index = parent;
  }
}

function heapifyDown(arr, index) {
  while (true) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let largest = index;

    if (left < arr.length && arr[left] > arr[largest]) largest = left;
    if (right < arr.length && arr[right] > arr[largest]) largest = right;

    if (largest === index) break;

    [arr[index], arr[largest]] = [arr[largest], arr[index]];
    index = largest;
  }
}

function heapMsg(text, color = "#dc2626") {
  const msg = document.getElementById("heapMessage");
  msg.textContent = text;
  msg.style.color = color;
}

function heapInsert() {
  const value = document.getElementById("heapValue").value.trim();
  if (value === "") {
    heapMsg("Please enter a value.");
    return;
  }

  const v = Number(value);
  heapData.push(v);
  heapifyUp(heapData, heapData.length - 1);
  drawHeap();
  heapMsg(`Inserted ${v} into heap`, "green");
}

function heapDeleteRoot() {
  if (heapData.length === 0) {
    heapMsg("Heap is empty.");
    return;
  }

  const root = heapData[0];

  if (heapData.length === 1) {
    heapData.pop();
  } else {
    heapData[0] = heapData.pop();
    heapifyDown(heapData, 0);
  }

  drawHeap();
  heapMsg(`Deleted root ${root}`, "green");
}

function heapPeek() {
  if (heapData.length === 0) {
    heapMsg("Heap is empty.");
    return;
  }

  drawHeap(`Root element: ${heapData[0]}`);
  heapMsg(`Root element is ${heapData[0]}`, "green");
}

function heapReset() {
  heapData = [];
  drawHeap();
  heapMsg("Heap cleared successfully.", "green");
}

/* =========================
   GRAPH VISUALIZER
========================= */
let graphData = {};

function renderGraphUI() {
  visualizerPanel.innerHTML = `
    <div class="visualizer-box">
      <div class="controls">
        <input type="text" id="graphVertex" placeholder="Vertex (e.g. A)" />
        <button class="action-btn" onclick="graphAddVertex()">Add Vertex</button>
        <br />
        <input type="text" id="graphFrom" placeholder="From" />
        <input type="text" id="graphTo" placeholder="To" />
        <button class="action-btn" onclick="graphAddEdge()">Add Edge</button>
        <button class="action-btn" onclick="graphDeleteVertex()">Delete Vertex</button>
        <button class="action-btn" onclick="graphDeleteEdge()">Delete Edge</button>
        <button class="action-btn" onclick="graphBFS()">BFS</button>
        <button class="action-btn" onclick="graphDFS()">DFS</button>
        <button class="action-btn" onclick="graphReset()">Reset</button>
      </div>

      <div id="graphOutput" class="structure-output"></div>
      <div id="graphMessage" class="message"></div>

      <div class="complexity-box">
        <h2>Graph Operations</h2>
        <p>Add / Delete Vertex, Add / Delete Edge, BFS, DFS</p>
      </div>
    </div>
  `;
  drawGraph();
}

function drawGraph(extraText = "") {
  const output = document.getElementById("graphOutput");

  if (Object.keys(graphData).length === 0) {
    output.textContent = "Graph is empty";
    return;
  }

  let text = "Adjacency List:\n\n";
  for (let vertex in graphData) {
    text += `${vertex} → ${graphData[vertex].join(", ")}\n`;
  }

  if (extraText) text += `\n${extraText}`;
  output.textContent = text;
}

function graphMsg(text, color = "#dc2626") {
  const msg = document.getElementById("graphMessage");
  msg.textContent = text;
  msg.style.color = color;
}

function graphAddVertex() {
  const vertex = document.getElementById("graphVertex").value.trim().toUpperCase();
  if (vertex === "") {
    graphMsg("Please enter a vertex.");
    return;
  }

  if (graphData[vertex]) {
    graphMsg(`Vertex ${vertex} already exists.`);
    return;
  }

  graphData[vertex] = [];
  drawGraph();
  graphMsg(`Vertex ${vertex} added`, "green");
}

function graphAddEdge() {
  const from = document.getElementById("graphFrom").value.trim().toUpperCase();
  const to = document.getElementById("graphTo").value.trim().toUpperCase();

  if (from === "" || to === "") {
    graphMsg("Please enter both vertices.");
    return;
  }

  if (!graphData[from]) graphData[from] = [];
  if (!graphData[to]) graphData[to] = [];

  if (!graphData[from].includes(to)) graphData[from].push(to);
  if (!graphData[to].includes(from)) graphData[to].push(from);

  drawGraph();
  graphMsg(`Edge added between ${from} and ${to}`, "green");
}

function graphDeleteVertex() {
  const vertex = document.getElementById("graphVertex").value.trim().toUpperCase();
  if (vertex === "") {
    graphMsg("Please enter a vertex.");
    return;
  }

  if (!graphData[vertex]) {
    graphMsg(`Vertex ${vertex} does not exist.`);
    return;
  }

  delete graphData[vertex];
  for (let v in graphData) {
    graphData[v] = graphData[v].filter(nei => nei !== vertex);
  }

  drawGraph();
  graphMsg(`Vertex ${vertex} deleted`, "green");
}

function graphDeleteEdge() {
  const from = document.getElementById("graphFrom").value.trim().toUpperCase();
  const to = document.getElementById("graphTo").value.trim().toUpperCase();

  if (from === "" || to === "") {
    graphMsg("Please enter both vertices.");
    return;
  }

  if (!graphData[from] || !graphData[to]) {
    graphMsg("One or both vertices do not exist.");
    return;
  }

  graphData[from] = graphData[from].filter(v => v !== to);
  graphData[to] = graphData[to].filter(v => v !== from);

  drawGraph();
  graphMsg(`Edge removed between ${from} and ${to}`, "green");
}

function bfsTraversal(start) {
  const visited = new Set();
  const queue = [start];
  const result = [];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    for (let nei of graphData[node]) {
      if (!visited.has(nei)) {
        visited.add(nei);
        queue.push(nei);
      }
    }
  }

  return result;
}

function dfsTraversal(start, visited = new Set(), result = []) {
  visited.add(start);
  result.push(start);

  for (let nei of graphData[start]) {
    if (!visited.has(nei)) {
      dfsTraversal(nei, visited, result);
    }
  }

  return result;
}

function graphBFS() {
  const start = document.getElementById("graphVertex").value.trim().toUpperCase();
  if (start === "") {
    graphMsg("Enter starting vertex in Vertex box.");
    return;
  }

  if (!graphData[start]) {
    graphMsg(`Vertex ${start} does not exist.`);
    return;
  }

  const result = bfsTraversal(start).join(" → ");
  drawGraph(`BFS from ${start}: ${result}`);
  graphMsg(`BFS completed from ${start}`, "green");
}

function graphDFS() {
  const start = document.getElementById("graphVertex").value.trim().toUpperCase();
  if (start === "") {
    graphMsg("Enter starting vertex in Vertex box.");
    return;
  }

  if (!graphData[start]) {
    graphMsg(`Vertex ${start} does not exist.`);
    return;
  }

  const result = dfsTraversal(start).join(" → ");
  drawGraph(`DFS from ${start}: ${result}`);
  graphMsg(`DFS completed from ${start}`, "green");
}

function graphReset() {
  graphData = {};
  drawGraph();
  graphMsg("Graph cleared successfully.", "green");
}

/* =========================
   TRIE VISUALIZER
========================= */
let trieWords = [];

function renderTrieUI() {
  visualizerPanel.innerHTML = `
    <div class="visualizer-box">
      <div class="controls">
        <input type="text" id="trieWord" placeholder="Enter word" />
        <button class="action-btn" onclick="trieInsert()">Insert</button>
        <button class="action-btn" onclick="trieSearch()">Search</button>
        <button class="action-btn" onclick="triePrefixSearch()">Prefix Search</button>
        <button class="action-btn" onclick="trieReset()">Reset</button>
      </div>

      <div id="trieOutput" class="structure-output"></div>
      <div id="trieMessage" class="message"></div>

      <div class="complexity-box">
        <h2>Trie Operations</h2>
        <p><strong>Insert:</strong> O(L)</p>
        <p><strong>Search:</strong> O(L)</p>
        <p><strong>Prefix Search:</strong> O(L)</p>
        <p>L = length of word</p>
      </div>
    </div>
  `;
  drawTrie();
}

function drawTrie(extraText = "") {
  const output = document.getElementById("trieOutput");

  if (trieWords.length === 0) {
    output.textContent = "Trie is empty";
    return;
  }

  output.textContent =
    "Words stored in Trie:\n\n" +
    trieWords.join(", ") +
    (extraText ? `\n\n${extraText}` : "");
}

function trieMsg(text, color = "#dc2626") {
  const msg = document.getElementById("trieMessage");
  msg.textContent = text;
  msg.style.color = color;
}

function trieInsert() {
  const word = document.getElementById("trieWord").value.trim().toLowerCase();
  if (word === "") {
    trieMsg("Please enter a word.");
    return;
  }

  if (trieWords.includes(word)) {
    trieMsg(`"${word}" already exists.`);
    return;
  }

  trieWords.push(word);
  drawTrie();
  trieMsg(`Inserted "${word}" into Trie`, "green");
}

function trieSearch() {
  const word = document.getElementById("trieWord").value.trim().toLowerCase();
  if (word === "") {
    trieMsg("Please enter a word.");
    return;
  }

  if (trieWords.includes(word)) {
    drawTrie(`"${word}" found in Trie`);
    trieMsg(`"${word}" found in Trie`, "green");
  } else {
    drawTrie();
    trieMsg(`"${word}" not found`);
  }
}

function triePrefixSearch() {
  const prefix = document.getElementById("trieWord").value.trim().toLowerCase();
  if (prefix === "") {
    trieMsg("Please enter a prefix.");
    return;
  }

  const matched = trieWords.filter(word => word.startsWith(prefix));
  if (matched.length === 0) {
    drawTrie();
    trieMsg(`No words found with prefix "${prefix}"`);
  } else {
    drawTrie(`Words with prefix "${prefix}": ${matched.join(", ")}`);
    trieMsg(`Prefix search completed for "${prefix}"`, "green");
  }
}

function trieReset() {
  trieWords = [];
  drawTrie();
  trieMsg("Trie cleared successfully.", "green");
}