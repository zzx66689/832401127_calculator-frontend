let inputDom = null;
let historyListDom = null;
const BACKEND_URL = "http://127.0.0.1:3000";

document.addEventListener('DOMContentLoaded', function(){
  inputDom = document.getElementById('input');
  historyListDom = document.getElementById('historyList');
  console.log("获取输入框元素：", inputDom);
  loadHistory();
});

function appendNum(val) {
  if (!inputDom) return;
  inputDom.value += val;
  console.log("输入框现在内容：", inputDom.value);
}

async function calc() {
  if (!inputDom) return;
  const expr = inputDom.value.trim();
  console.log("准备发给后端的表达式：", expr);

  try {
    const res = await fetch(`${BACKEND_URL}/calc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ expr })
    });
    const data = await res.json();
    console.log("后端返回结果：", data);
    inputDom.value = data.result;
    loadHistory();
  } catch (err) {
    console.error("请求出错：", err);
    alert("计算错误！");
  }
}

function clearAll() {
  if (!inputDom) return;
  inputDom.value = "";
}

async function loadHistory() {
  if (!historyListDom) return;
  try {
    const res = await fetch(`${BACKEND_URL}/history`);
    const list = await res.json();
    historyListDom.innerHTML = "";
    list.forEach(item => {
      const li = document.createElement("li");
      li.innerText = `${item.expr} = ${item.result}`;
      historyListDom.appendChild(li);
    })
  } catch (err) {
    console.error("读取历史失败：", err);
  }
}







