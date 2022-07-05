(() => {
  const form = document.querySelector(".adicionar");
  const nameItem = document.querySelector("[data-inp=name]").value;
  const qttItem = document.querySelector("[data-inp=quantity]").valueAsNumber;

  const list = document.querySelector("[data-list]");
  let listObj = {};
  let listItem = [];

  let resetItem = () => {
    listObj.name = "";
    listObj.qtt = 0;
  };
  resetItem();

  let getItem = (event) => {
    event.preventDefault();

    listObj.name = nameItem;
    listObj.qtt = qttItem;

    listItem.push(listObj);
    updateList();
  };

  let updateList = () => {
    list.innerHTML = "";
    listItem.forEach((item) => {
      console.log(item, item.name);
      const node = document.createElement("li");
      node.classList.add("item");
      node.textContent = item.name;
      console.log(node, typeof item.name);

      list.appendChild(node);
    });
  };

  form.addEventListener("submit", getItem);
})();
