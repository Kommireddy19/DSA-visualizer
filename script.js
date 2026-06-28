/* ==========================================
              PAGE NAVIGATION
========================================== */

const pages = document.querySelectorAll(".page");

let previousPage = "categoryPage";

function showPage(pageId) {

    pages.forEach(page => page.classList.remove("active"));

    document.getElementById(pageId).classList.add("active");

}


/* ==========================================
              DATA STRUCTURES
========================================== */

const linearStructures = [

{
title:"Array",
description:"Stores elements in contiguous memory locations for fast access."
},

{
title:"Stack",
description:"Follows Last In First Out (LIFO) principle."
},

{
title:"Queue",
description:"Follows First In First Out (FIFO) principle."
},

{
title:"Linked List",
description:"Collection of nodes connected using pointers."
}

];


const nonLinearStructures = [

{
title:"Tree",
description:"Hierarchical non-linear data structure."
},

{
title:"Graph",
description:"Collection of vertices connected by edges."
}

];


/* ==========================================
          OPEN CATEGORY
========================================== */

function openCategory(type){

previousPage="categoryPage";

showPage("listPage");

const title=document.getElementById("listTitle");

const container=document.getElementById("listContainer");

container.innerHTML="";

let data=[];

if(type==="linear"){

title.innerHTML="Linear Data Structures";

data=linearStructures;

}

else{

title.innerHTML="Non-Linear Data Structures";

data=nonLinearStructures;

}

data.forEach(item=>{

container.innerHTML+=`

<div class="card">

<h2>${item.title}</h2>

<p>${item.description}</p>

<button onclick="toggleLearn(this)">
Learn More
</button>

<button onclick="openVisualizer('${item.title}')">
Open
</button>

<div class="learn-box">

<h3>${item.title}</h3>

<p>${item.description}</p>

</div>

</div>

`;

});

}


/* ==========================================
             LEARN MORE
========================================== */

function toggleLearn(button){

const learnBox=button.nextElementSibling.nextElementSibling;

if(learnBox.style.display==="block"){

learnBox.style.display="none";

button.innerHTML="Learn More";

}

else{

learnBox.style.display="block";

button.innerHTML="Hide";

}

}


/* ==========================================
            OPEN VISUALIZER
========================================== */

function openVisualizer(name){

previousPage="listPage";

showPage("visualizerPage");

document.getElementById("visualizerTitle").innerHTML=name;

document.getElementById("visualizerPanel").innerHTML=`

<h2 style="text-align:center;margin-top:100px;">

${name}

</h2>

<p style="text-align:center;font-size:20px;margin-top:20px;">

Operations will be added here.

</p>

`;

}


/* ==========================================
             BACK BUTTON
========================================== */

function goBack(){

showPage(previousPage);

}

function openVisualizer(name){

    previousPage="listPage";

    showPage("visualizerPage");

    document.getElementById("visualizerTitle").innerHTML=name;

    if(name==="Array"){

        renderArray();

    }

    else if(name==="Stack"){

        renderStack();

    }

    else if(name==="Queue"){

        renderQueue();

    }
    else if(name==="Linked List"){

    renderLinkedList();

    }
    else if(name==="Tree"){

    renderTree();

    }
    else if(name==="Graph"){

    renderGraph();

    }

    else{

        document.getElementById("visualizerPanel").innerHTML=`
        <h2 style="text-align:center;margin-top:120px;">
        ${name}
        </h2>
        <p style="text-align:center;">
        Operations will be added soon.
        </p>
        `;
    }

}

/* ==========================================
              ARRAY VISUALIZER
========================================== */

let array=[];

function renderArray() {

document.getElementById("visualizerPanel").innerHTML = `

<div class="ds-layout">

<div class="left-panel">

<h2>Array Operations</h2>

<input type="number" id="arrayValue" placeholder="Enter Value">

<input type="number" id="arrayIndex" placeholder="Enter Index">

<button onclick="insertBeginning()">Insert Beginning</button>

<button onclick="insertEnd()">Insert End</button>

<button onclick="insertIndex()">Insert At Index</button>

<button onclick="deleteValue()">Delete Value</button>

<button onclick="searchValue()">Search</button>

<button onclick="updateValue()">Update</button>

<button onclick="reverseArray()">Reverse</button>

<button onclick="resetArray()">Reset</button>

<div id="arrayMessage" class="message"></div>

<div class="complexity">

<h3>Time Complexity</h3>

<p>Insert Beginning : O(n)</p>
<p>Insert End : O(1)</p>
<p>Insert Index : O(n)</p>
<p>Delete : O(n)</p>
<p>Search : O(n)</p>
<p>Update : O(1)</p>
<p>Reverse : O(n)</p>

</div>

</div>


<div class="right-panel">

<h2>Array Visualization</h2>

<div id="arrayContainer" class="arrayContainer"></div>

</div>

</div>

`;

drawArray();

}
function drawArray() {

const container = document.getElementById("arrayContainer");

container.innerHTML = "";

if(array.length==0){

container.innerHTML="<h3>Array is Empty</h3>";

return;

}

array.forEach((value,index)=>{

container.innerHTML+=`

<div class="arrayItem">

<div class="box">${value}</div>

<div class="index">${index}</div>

</div>

`;

});

}

function message(text,color="green"){

const msg=document.getElementById("arrayMessage");

msg.innerHTML=text;

msg.style.color=color;

}

function insertBeginning(){

const value=document.getElementById("arrayValue").value;

if(value==="") return;

array.unshift(Number(value));

drawArray();

message("Inserted at Beginning");

}
function insertEnd(){

const value=document.getElementById("arrayValue").value;

if(value==="") return;

array.push(Number(value));

drawArray();

message("Inserted at End");

}
function insertIndex(){

const value=document.getElementById("arrayValue").value;

const index=document.getElementById("arrayIndex").value;

if(value==="" || index==="") return;

array.splice(index,0,Number(value));

drawArray();

message("Inserted Successfully");

}
function deleteValue(){

const value=document.getElementById("arrayValue").value;

const index=array.indexOf(Number(value));

if(index==-1){

message("Value Not Found","red");

return;

}

array.splice(index,1);

drawArray();

message("Deleted Successfully");

}
function searchValue(){

const value=document.getElementById("arrayValue").value;

const index=array.indexOf(Number(value));

if(index==-1){

message("Value Not Found","red");

}

else{

message("Found at Index : "+index);

}

}
function updateValue(){

const value=document.getElementById("arrayValue").value;

const index=document.getElementById("arrayIndex").value;

if(value==="" || index==="") return;

array[index]=Number(value);

drawArray();

message("Updated Successfully");

}
function reverseArray(){

array.reverse();

drawArray();

message("Array Reversed");

}
function resetArray(){

array=[];

drawArray();

message("Array Cleared");

}

/* ==========================================
                STACK VISUALIZER
========================================== */

let stack=[];

function renderStack(){

document.getElementById("visualizerPanel").innerHTML=`

<div class="ds-layout">

    <div class="left-panel">

        <h2>Stack Operations</h2>

        <input type="number" id="stackValue" placeholder="Enter Value">

        <button onclick="pushStack()">Push</button>

        <button onclick="popStack()">Pop</button>

        <button onclick="peekStack()">Peek</button>

        <button onclick="isEmptyStack()">is Empty</button>

        <button onclick="sizeStack()">Size</button>

        <button onclick="resetStack()">Reset</button>

        <div id="stackMessage" class="message"></div>

        <div class="complexity">

            <h3>Time Complexity</h3>

            <p>Push : O(1)</p>
            <p>Pop : O(1)</p>
            <p>Peek : O(1)</p>
            <p>isEmpty : O(1)</p>
            <p>Size : O(1)</p>

        </div>

    </div>

    <div class="right-panel">

        <h2>Stack Visualization</h2>

        <div id="stackContainer" class="stackContainer"></div>

    </div>

</div>

`;

drawStack();

}
function drawStack(){

const container=document.getElementById("stackContainer");

container.innerHTML="";

if(stack.length===0){

container.innerHTML="<h2>Stack is Empty</h2>";

return;

}

container.innerHTML+=`

<div class="topLabel">TOP</div>

`;

for(let i=stack.length-1;i>=0;i--){

container.innerHTML+=`

<div class="stackItem">

${stack[i]}

</div>

`;

}

container.innerHTML+=`

<div class="bottomLabel">BOTTOM</div>

`;

}
function stackMessage(text,color="green"){

const msg=document.getElementById("stackMessage");

msg.innerHTML=text;

msg.style.color=color;

}
function pushStack(){

const value=document.getElementById("stackValue").value;

if(value==="") return;

stack.push(Number(value));

drawStack();

stackMessage("Element Pushed");

}
function popStack(){

if(stack.length===0){

stackMessage("Stack Underflow","red");

return;

}

stack.pop();

drawStack();

stackMessage("Element Popped");

}
function peekStack(){

if(stack.length===0){

stackMessage("Stack Empty","red");

return;

}

stackMessage("Top Element : "+stack[stack.length-1]);

}
function isEmptyStack(){

if(stack.length===0)

stackMessage("Stack is Empty");

else

stackMessage("Stack is Not Empty");

}
function sizeStack(){

stackMessage("Stack Size : "+stack.length);

}
function resetStack(){

stack=[];

drawStack();

stackMessage("Stack Cleared");

}

/* ==========================================
              QUEUE VISUALIZER
========================================== */

let queue=[];

function renderQueue(){

document.getElementById("visualizerPanel").innerHTML=`

<div class="ds-layout">

<div class="left-panel">

<h2>Queue Operations</h2>

<input type="number" id="queueValue" placeholder="Enter Value">

<button onclick="enqueue()">Enqueue</button>

<button onclick="dequeue()">Dequeue</button>

<button onclick="frontQueue()">Front</button>

<button onclick="rearQueue()">Rear</button>

<button onclick="isEmptyQueue()">is Empty</button>

<button onclick="sizeQueue()">Size</button>

<button onclick="resetQueue()">Reset</button>

<div id="queueMessage" class="message"></div>

<div class="complexity">

<h3>Time Complexity</h3>

<p>Enqueue : O(1)</p>

<p>Dequeue : O(1)</p>

<p>Front : O(1)</p>

<p>Rear : O(1)</p>

<p>isEmpty : O(1)</p>

<p>Size : O(1)</p>

</div>

</div>

<div class="right-panel">

<h2>Queue Visualization</h2>

<div id="queueContainer" class="queueContainer"></div>

</div>

</div>

`;

drawQueue();

}
function drawQueue(){

const container=document.getElementById("queueContainer");

container.innerHTML="";

if(queue.length===0){

container.innerHTML="<h2>Queue is Empty</h2>";

return;

}

container.innerHTML+=`

<div class="queueLabel front">

FRONT →

</div>

<div class="queueRow">

`;

queue.forEach(value=>{

container.innerHTML+=`

<div class="queueItem">

${value}

</div>

`;

});

container.innerHTML+=`

</div>

<div class="queueLabel rear">

← REAR

</div>

`;

}
function queueMessage(text,color="green"){

const msg=document.getElementById("queueMessage");

msg.innerHTML=text;

msg.style.color=color;

}
function enqueue(){

const value=document.getElementById("queueValue").value;

if(value==="") return;

queue.push(Number(value));

drawQueue();

queueMessage("Element Enqueued");

}
function dequeue(){

if(queue.length===0){

queueMessage("Queue Underflow","red");

return;

}

queue.shift();

drawQueue();

queueMessage("Element Dequeued");

}
function frontQueue(){

if(queue.length===0){

queueMessage("Queue is Empty","red");

return;

}

queueMessage("Front Element : "+queue[0]);

}
function rearQueue(){

if(queue.length===0){

queueMessage("Queue is Empty","red");

return;

}

queueMessage("Rear Element : "+queue[queue.length-1]);

}
function isEmptyQueue(){

queueMessage(

queue.length===0 ?

"Queue is Empty"

:

"Queue is Not Empty"

);

}
function sizeQueue(){

queueMessage("Queue Size : "+queue.length);

}
function resetQueue(){

queue=[];

drawQueue();

queueMessage("Queue Cleared");

}

/* ==========================================
          LINKED LIST VISUALIZER
========================================== */

let linkedList=[];

function renderLinkedList(){

document.getElementById("visualizerPanel").innerHTML=`

<div class="ds-layout">

<div class="left-panel">

<h2>Linked List Operations</h2>

<input type="number" id="llValue" placeholder="Enter Value">

<input type="number" id="llIndex" placeholder="Enter Position">

<button onclick="insertBeginningLL()">Insert Beginning</button>

<button onclick="insertEndLL()">Insert End</button>

<button onclick="insertPositionLL()">Insert At Position</button>

<button onclick="deleteBeginningLL()">Delete Beginning</button>

<button onclick="deleteEndLL()">Delete End</button>

<button onclick="deleteValueLL()">Delete Value</button>

<button onclick="searchLL()">Search</button>

<button onclick="reverseLL()">Reverse</button>

<button onclick="countLL()">Count Nodes</button>

<button onclick="resetLL()">Reset</button>

<div id="llMessage" class="message"></div>

<div class="complexity">

<h3>Time Complexity</h3>

<p>Insert Beginning : O(1)</p>

<p>Insert End : O(n)</p>

<p>Insert Position : O(n)</p>

<p>Delete : O(n)</p>

<p>Search : O(n)</p>

<p>Reverse : O(n)</p>

</div>

</div>

<div class="right-panel">

<h2>Linked List Visualization</h2>

<div id="linkedListContainer" class="linkedListContainer"></div>

</div>

</div>

`;

drawLinkedList();

}
function drawLinkedList(){

const container=document.getElementById("linkedListContainer");

container.innerHTML="";

if(linkedList.length===0){

container.innerHTML="<h2>Linked List is Empty</h2>";

return;

}

linkedList.forEach((value,index)=>{

container.innerHTML+=`

<div class="node">

<div class="nodeBox">${value}</div>

</div>

`;

if(index!=linkedList.length-1){

container.innerHTML+=`

<div class="arrow">→</div>

`;

}

});

container.innerHTML+=`

<div class="nullNode">NULL</div>

`;

}
function llMessage(text,color="green"){

const msg=document.getElementById("llMessage");

msg.innerHTML=text;

msg.style.color=color;

}
function insertBeginningLL(){

const value=document.getElementById("llValue").value;

if(value==="") return;

linkedList.unshift(Number(value));

drawLinkedList();

llMessage("Inserted at Beginning");

}
function insertEndLL(){

const value=document.getElementById("llValue").value;

if(value==="") return;

linkedList.push(Number(value));

drawLinkedList();

llMessage("Inserted at End");

}
function insertPositionLL(){

const value=document.getElementById("llValue").value;

const pos=document.getElementById("llIndex").value;

if(value==="" || pos==="") return;

linkedList.splice(Number(pos),0,Number(value));

drawLinkedList();

llMessage("Inserted Successfully");

}
function deleteBeginningLL(){

if(linkedList.length===0){

llMessage("Linked List Empty","red");

return;

}

linkedList.shift();

drawLinkedList();

llMessage("Deleted Beginning Node");

}
function deleteEndLL(){

if(linkedList.length===0){

llMessage("Linked List Empty","red");

return;

}

linkedList.pop();

drawLinkedList();

llMessage("Deleted Last Node");

}
function deleteValueLL(){

const value=document.getElementById("llValue").value;

const index=linkedList.indexOf(Number(value));

if(index==-1){

llMessage("Value Not Found","red");

return;

}

linkedList.splice(index,1);

drawLinkedList();

llMessage("Node Deleted");

}
function searchLL(){

const value=document.getElementById("llValue").value;

const index=linkedList.indexOf(Number(value));

if(index==-1)

llMessage("Value Not Found","red");

else

llMessage("Found at Position : "+index);

}
function reverseLL(){

linkedList.reverse();

drawLinkedList();

llMessage("Linked List Reversed");

}
function countLL(){

llMessage("Total Nodes : "+linkedList.length);

}
function resetLL(){

linkedList=[];

drawLinkedList();

llMessage("Linked List Cleared");

}
/* ==========================================
           TREE VISUALIZER (BST)
========================================== */

let tree = [];

function renderTree(){

document.getElementById("visualizerPanel").innerHTML = `

<div class="ds-layout">

<div class="left-panel">

<h2>Tree Operations</h2>

<input type="number" id="treeValue" placeholder="Enter Value">

<button onclick="insertTree()">Insert</button>

<button onclick="deleteTree()">Delete</button>

<button onclick="searchTree()">Search</button>

<button onclick="inorderTree()">Inorder</button>

<button onclick="preorderTree()">Preorder</button>

<button onclick="postorderTree()">Postorder</button>

<button onclick="findMinTree()">Find Minimum</button>

<button onclick="findMaxTree()">Find Maximum</button>

<button onclick="treeHeight()">Height</button>

<button onclick="countNodes()">Count Nodes</button>

<button onclick="countLeafNodes()">Leaf Nodes</button>

<button onclick="resetTree()">Reset</button>

<div id="treeMessage" class="message"></div>

<div class="complexity">

<h3>Time Complexity</h3>

<p>Insert : O(log n)</p>

<p>Delete : O(log n)</p>

<p>Search : O(log n)</p>

<p>Traversals : O(n)</p>

</div>

</div>

<div class="right-panel">

<h2>Tree Visualization</h2>

<div id="treeContainer" class="treeContainer"></div>

</div>

</div>

`;

drawTree();

}
function drawTree(){

const container=document.getElementById("treeContainer");

container.innerHTML="";

if(tree.length===0){

container.innerHTML="<h2>Tree is Empty</h2>";

return;

}

let level=0;
let i=0;

while(i<tree.length){

let count=Math.pow(2,level);

let row=document.createElement("div");

row.className="treeRow";

for(let j=0;j<count && i<tree.length;j++,i++){

row.innerHTML+=`

<div class="treeNode">

${tree[i]}

</div>

`;

}

container.appendChild(row);

level++;

}

}
function treeMessage(text,color="green"){

document.getElementById("treeMessage").innerHTML=text;

document.getElementById("treeMessage").style.color=color;

}
function insertTree(){

const value=document.getElementById("treeValue").value;

if(value==="") return;

tree.push(Number(value));

tree.sort((a,b)=>a-b);

drawTree();

treeMessage("Inserted Successfully");

}
function deleteTree(){

const value=document.getElementById("treeValue").value;

const index=tree.indexOf(Number(value));

if(index==-1){

treeMessage("Value Not Found","red");

return;

}

tree.splice(index,1);

drawTree();

treeMessage("Deleted Successfully");

}
function searchTree(){

const value=document.getElementById("treeValue").value;

if(tree.includes(Number(value)))

treeMessage("Value Found");

else

treeMessage("Value Not Found","red");

}
function inorderTree(){

treeMessage("Inorder : "+tree.join(" → "));

}

function preorderTree(){

treeMessage("Preorder : "+tree.join(" → "));

}

function postorderTree(){

treeMessage("Postorder : "+tree.slice().reverse().join(" → "));

}
function findMinTree(){

if(tree.length===0){

treeMessage("Tree is Empty","red");

return;

}

treeMessage("Minimum Value : "+Math.min(...tree));

}
function findMaxTree(){

if(tree.length===0){

treeMessage("Tree is Empty","red");

return;

}

treeMessage("Maximum Value : "+Math.max(...tree));

}
function treeHeight(){

if(tree.length===0){

treeMessage("Height : 0");

return;

}

let height=Math.floor(Math.log2(tree.length))+1;

treeMessage("Tree Height : "+height);

}
function countNodes(){

treeMessage("Total Nodes : "+tree.length);

}

function countLeafNodes(){

if(tree.length===0){

treeMessage("Leaf Nodes : 0");

return;

}

let leaves=0;

for(let i=0;i<tree.length;i++){

let left=2*i+1;

let right=2*i+2;

if(left>=tree.length && right>=tree.length){

leaves++;

}

}

treeMessage("Leaf Nodes : "+leaves);

}

function resetTree(){

tree=[];

drawTree();

treeMessage("Tree Cleared");

}
/*==========================================
            GRAPH VISUALIZER
===========================================*/

let graph = {};

/* =========================
        UI RENDER
========================= */
function renderGraph() {

document.getElementById("visualizerPanel").innerHTML = `

<div class="ds-layout">

<div class="left-panel">

<h2>Graph Operations</h2>

<input type="text" id="vertex" placeholder="Vertex">
<input type="text" id="vertex1" placeholder="From">
<input type="text" id="vertex2" placeholder="To">

<button onclick="addVertex()">Add Vertex</button>
<button onclick="addEdge()">Add Edge</button>
<button onclick="removeVertex()">Remove Vertex</button>
<button onclick="removeEdge()">Remove Edge</button>
<button onclick="searchVertex()">Search Vertex</button>
<button onclick="bfsGraph()">BFS</button>
<button onclick="dfsGraph()">DFS</button>
<button onclick="displayGraph()">Display Graph</button>
<button onclick="resetGraph()">Reset</button>

<div id="graphMessage" class="message"></div>

</div>

<div class="right-panel">

<h2>Graph Visualization</h2>

<!-- IMPORTANT FIX -->
<canvas id="graphCanvas" width="600" height="400"></canvas>

</div>

</div>

`;

drawGraph();
}

/* =========================
        DRAW GRAPH
========================= */
function drawGraph() {

const canvas = document.getElementById("graphCanvas");
if (!canvas) return;

const ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);

let nodes = Object.keys(graph);

if (nodes.length === 0) {
    ctx.font = "18px Arial";
    ctx.fillText("Graph is Empty", 220, 200);
    return;
}

/* ---- circular layout ---- */
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let radius = 150;

let pos = {};

nodes.forEach((node, i) => {
    let angle = (i / nodes.length) * 2 * Math.PI;
    pos[node] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
    };
});

/* ---- draw edges ---- */
ctx.strokeStyle = "#555";
ctx.lineWidth = 2;

nodes.forEach(node => {
    graph[node].forEach(nei => {
        if (pos[nei]) {
            ctx.beginPath();
            ctx.moveTo(pos[node].x, pos[node].y);
            ctx.lineTo(pos[nei].x, pos[nei].y);
            ctx.stroke();
        }
    });
});

/* ---- draw nodes ---- */
nodes.forEach(node => {
    let p = pos[node];

    ctx.beginPath();
    ctx.arc(p.x, p.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#4CAF50";
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node, p.x, p.y);
});

}

/* =========================
        MESSAGE
========================= */
function graphMessage(text, color = "green") {
document.getElementById("graphMessage").innerHTML = text;
document.getElementById("graphMessage").style.color = color;
}

/* =========================
        OPERATIONS
========================= */

function addVertex() {
let v = document.getElementById("vertex").value.trim().toUpperCase();
if (!v) return;

if (!graph[v]) {
    graph[v] = [];
    graphMessage("Vertex Added");
} else {
    graphMessage("Vertex Already Exists", "red");
}

drawGraph();
}

function addEdge() {
let from = document.getElementById("vertex1").value.trim().toUpperCase();
let to = document.getElementById("vertex2").value.trim().toUpperCase();

if (!from || !to) return;

if (!graph[from]) graph[from] = [];
if (!graph[to]) graph[to] = [];

graph[from].push(to);
graph[to].push(from);

graphMessage("Edge Added");
drawGraph();
}

function removeVertex() {
let v = document.getElementById("vertex").value.trim().toUpperCase();

if (!graph[v]) {
    graphMessage("Vertex Not Found", "red");
    return;
}

delete graph[v];

for (let node in graph) {
    graph[node] = graph[node].filter(x => x !== v);
}

graphMessage("Vertex Removed");
drawGraph();
}

function removeEdge() {
let from = document.getElementById("vertex1").value.trim().toUpperCase();
let to = document.getElementById("vertex2").value.trim().toUpperCase();

if (!graph[from] || !graph[to]) return;

graph[from] = graph[from].filter(x => x !== to);
graph[to] = graph[to].filter(x => x !== from);

graphMessage("Edge Removed");
drawGraph();
}

function searchVertex() {
let v = document.getElementById("vertex").value.trim().toUpperCase();

if (graph[v]) graphMessage("Vertex Found");
else graphMessage("Vertex Not Found", "red");
}

/* =========================
        BFS
========================= */
function bfsGraph() {
let start = document.getElementById("vertex").value.trim().toUpperCase();
if (!graph[start]) return;

let visited = new Set();
let queue = [start];
let ans = [];

visited.add(start);

while (queue.length) {
    let node = queue.shift();
    ans.push(node);

    graph[node].forEach(n => {
        if (!visited.has(n)) {
            visited.add(n);
            queue.push(n);
        }
    });
}

graphMessage("BFS: " + ans.join(" → "));
}

/* =========================
        DFS
========================= */
function dfsGraph() {
let start = document.getElementById("vertex").value.trim().toUpperCase();
if (!graph[start]) return;

let visited = new Set();
let ans = [];

function dfs(v) {
    visited.add(v);
    ans.push(v);

    graph[v].forEach(n => {
        if (!visited.has(n)) dfs(n);
    });
}

dfs(start);

graphMessage("DFS: " + ans.join(" → "));
}

/* =========================
        DISPLAY / RESET
========================= */

function displayGraph() {
drawGraph();
graphMessage("Graph Displayed");
}

function resetGraph() {
graph = {};
drawGraph();
graphMessage("Graph Cleared");
}