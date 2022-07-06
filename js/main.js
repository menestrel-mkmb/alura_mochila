(() => {
  const form = document.querySelector(".adicionar");

  const nameInp = document.querySelector("[data-inp='name']");
  const qttInp = document.querySelector("[data-inp='quantity']");

  const list = document.querySelector("[data-list]");
  let listObj = {};
  let listItem = [];

  //clear list
  let resetList = () => {
    list.innerHTML = "";
  };

  //clear inputs
  let resetItem = () => {
    nameInp.value = "";
    qttInp.valueAsNumber = 1;
  };

  //on init functions to get local storage
  let getItemLS = (item) => {
    resetItem();
    listObj.name = item.name;
    listObj.qtt = item.qtt;
  };

  let getList = () => {
    const storage = localStorage.getItem("listItems") || [];

    if (storage.length == 0) return;
    resetList();

    const parsed = JSON.parse(storage);
    for (item of parsed) {
      getItemLS(item);
      listItem.push({ name: listObj.name, qtt: listObj.qtt });
    }

    updateList();
  };

  //to update actual object with input values
  let updateItem = (event) => {
    listObj.name = event.target.elements["nome"].value;
    listObj.qtt = event.target.elements["quantidade"].valueAsNumber;
    resetItem();
  };

  //add input value to list and local storage list
  let addItem = (event) => {
    event.preventDefault();

    updateItem(event);
    if (!checkRepeat(listObj.name, listObj.qtt))
      listItem.push({ name: listObj.name, qtt: listObj.qtt });

    updateList();
  };

  let removeItem = (event) => {
    event.preventDefault();

    const item = event.target.parentElement;
    const txt = item.querySelector("span").textContent;

    listItem = listItem.filter((item) => {
      return item.name !== txt;
    });

    updateList();
  };

  let checkItem = (event) => {
    event.preventDefault();

    const item = event.target;
    item.classList.toggle("done");
  };

  let checkRepeat = () => {
    let repeated = false;

    listItem = listItem.filter((item) => {
      if (item.name === listObj.name) {
        item.qtt = listObj.qtt;
        repeated = true;
      }
      return true;
    });

    return repeated;
  };

  let createQttBtn = (item) => {
    const qtt = document.createElement("strong");
    qtt.textContent = item.qtt;

    return qtt;
  };

  let createItemSpan = (item) => {
    const name = document.createElement("span");
    name.innerText = item.name;
    name.addEventListener("click", checkItem);

    return name;
  };

  let createDelBtn = () => {
    const del = document.createElement("strong");

    del.textContent = "X";
    del.classList.add("delete");
    del.addEventListener("click", removeItem);

    return del;
  };

  //create html element node
  let createItemList = (item, index) => {
    const node = document.createElement("li");
    node.classList.add(`item`);
    node.setAttribute("data-task", index);

    const qtt = createQttBtn(item);
    const name = createItemSpan(item);
    const del = createDelBtn();

    node.appendChild(qtt);
    node.appendChild(name);
    node.appendChild(del);

    return node;
  };

  //put list items on html
  let updateList = () => {
    localStorage.setItem("listItems", JSON.stringify(listItem));

    resetList();
    listItem.sort();

    listItem.forEach((item, index) => {
      const node = createItemList(item, index);

      list.appendChild(node);
    });
  };

  //on js startup, do somethings
  resetItem();
  getList();
  form.addEventListener("submit", addItem);
})();
