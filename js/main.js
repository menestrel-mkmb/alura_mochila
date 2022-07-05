(() => {
  const form = document.querySelector(".adicionar");

  const list = document.querySelector("[data-list]");
  let listObj = {};
  let listItem = [];

  let resetItem = () => {
    listObj.name = "";
    listObj.qtt = 0;
  };
  resetItem();

  let addItem = (event) => {
    event.preventDefault();

    listObj.name = event.target.elements["nome"].value;
    listObj.qtt = event.target.elements["quantidade"].valueAsNumber;

    listItem.push(listObj);
    updateList();
  };

  let createItemList = (item) => {
    const node = document.createElement("li");

    node.classList.add("item");
    node.textContent = item.name;

    const qtt = document.createElement("strong");
    qtt.textContent = item.qtt;

    node.appendChild(qtt);

    return node;
  };

  let updateList = () => {
    list.innerHTML = "";
    listItem.forEach((item) => {
      const node = createItemList(item);

      list.appendChild(node);
    });
  };

  form.addEventListener("submit", addItem);
})();
