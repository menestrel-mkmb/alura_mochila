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
    listItem.push({ name: listObj.name, qtt: listObj.qtt });

    localStorage.setItem("listItems", JSON.stringify(listItem));

    updateList();
  };

  //create html element node
  let createItemList = (item) => {
    const node = document.createElement("li");
    node.classList.add("item");

    const qtt = document.createElement("strong");
    qtt.textContent = item.qtt;

    const name = document.createElement("span");
    name.innerText = item.name;

    node.appendChild(qtt);
    node.appendChild(name);

    return node;
  };

  //put list items on html
  let updateList = () => {
    resetList();
    listItem.forEach((item) => {
      const node = createItemList(item);

      list.appendChild(node);
    });
  };

  //on js startup, do somethings
  resetItem();
  getList();
  form.addEventListener("submit", addItem);
})();
