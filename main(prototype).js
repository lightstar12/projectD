let data;
const loadFile = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.onchange = evt => {
    const selectedFile = evt.target.files[0];
    processJSON(selectedFile);
  };
  input.click();
}

const processJSON = file => {
  const reader = new FileReader();
  reader.onload = () => {
    data = JSON.parse(reader.result);
    // for (let i = 0; i < data.equipment.length; i++) {
    //   console.log(data.equipment[i]);
    // }
    // console.log(data.equipment.length);

    for (let i = 0; i < data.equipment.length; i++) {
      if (i === 1) {
        continue;
      }
      const item = data.equipment[i];
      // console.log(item.slotId);
      makeItemInfoTable(item);
    }
  }
  reader.readAsText(file);
}

const body = document.querySelector("#body");

const makeItemInfoTable = (item) => {
  const slot_div = document.createElement("div");
  const item_slotId = item.slotId;
  slot_div.setAttribute("id", item_slotId.toLowerCase());

  const slot_table = document.createElement("table");
  const slot_Name_tr = document.createElement("tr");
  const slot_slotName_td = document.createElement("td");
  const item_slotName = item.slotName;
  slot_slotName_td.setAttribute("id", slot_slotName_td);
  slot_slotName_td.innerText = item_slotName;

  const slot_itemName_td = document.createElement("td");
  const item_itemName = item.itemName;
  slot_itemName_td.setAttribute("id", slot_itemName_td);
  slot_itemName_td.innerText = item_itemName;

  slot_Name_tr.append(slot_slotName_td, slot_itemName_td);

  slot_table.append(slot_Name_tr);

  for (let i = 1; i <= 4; i++) {
    const slot_option_tr = document.createElement("tr");
    const slot_option_td = document.createElement("td");
    slot_option_td.innerText = `${i}옵션`;

    const slot_optionName_td = document.createElement("td");
    // 고정픽, 커스텀픽에 따라 optionName을 다르게 할당해야함
    let item_optionName;
    if (item.customOption != undefined) {
      item_optionName = item.customOption.options[i-1].explain;
      console.log(item_optionName);
      // for (let j = 0; j < item_optionName.length; j++) {
      //   console.log(item_optionName[j].explain);
      // }
    }
    else if (item.fixedOption != undefined) {
      item_optionName = item.fixedOption.explain;
      console.log(item_optionName);
    }
    // console.log(Object.keys(item_optionName));
    // console.log(typeof(item_optionName));
    slot_optionName_td.innerText = `${i}옵션은 머머머다`;
    slot_optionName_td.setAttribute("id", `option${i}`);
    if (slot_optionName_td.innerText.indexOf("\n") != -1) {
      const optionArr = slot_optionName_td.innerText.split("\n");
      slot_optionName_td.innerText = '';
      for (let i = 0; i < optionArr.length; i++) {
        if (optionArr[i] === "") {
          optionArr.splice(i, 1);
          i--;
        }
      }
      const optionStr = optionArr.join("\n");
      slot_optionName_td.innerText = optionStr;
    }

    slot_option_tr.append(slot_option_td, slot_optionName_td);
    slot_table.append(slot_option_tr);
  }

  slot_div.append(slot_table);

  body.append(slot_div);
}

// makeItemInfoTable('weapon');
// makeItemInfoTable('jacket');
// makeItemInfoTable('shoulder');
// makeItemInfoTable('pants');
// makeItemInfoTable('shoes');
// makeItemInfoTable('waist');
// makeItemInfoTable('amulet');
// makeItemInfoTable('wrist');
// makeItemInfoTable('ring');
// makeItemInfoTable('support');
// makeItemInfoTable('magic_stone');
// makeItemInfoTable('earring');