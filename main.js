const $$ = (selector) => { return document.querySelector(selector);}
const sums = {
  money : null,
  money2 : null
}

const changeMe = (e) => {
  const minds = [];

  const addToName = e.srcElement.id.indexOf("2") > 0 ? "2" : "";

  const val = {
    price: parseFloat($$(`#txtMoney${addToName}`).value),
    value: parseFloat($$(`#txtValue${addToName}`).value)
  }

  sums[`money${addToName}`] = null;

  if (val.price && val.value) {
    sums[`money${addToName}`] = +(val.price / val.value * 1000).toFixed(2);
    minds.push(`За кг\\л\\1000шт - <span class="big">${sums[`money${addToName}`].toLocaleString()}</span> денег`);
  }

  let compareText = "";
  if (sums.money && sums.money2)
    compareText = sums.money < sums.money2 ? "<<< Первый выгоднее!" : (sums.money > sums.money2 ? "Второй выгоднее! >>>>" : "<<< Однофигово >>>");
  
  $$(`#txtChecks${addToName}`).innerHTML = minds.join("/r/n");
  $$("#resume").innerHTML = compareText;

  $$("#umoney").style.setProperty("visibility", compareText ? "visible" : "hidden");
  
}

const changeMeToo = (e) => {

}

const afterLoad = () => {
  $$('#txtMoney').addEventListener("keyup", changeMe);
  $$('#txtValue').addEventListener("keyup", changeMe);
  $$('#txtMoney2').addEventListener("keyup", changeMe);
  $$('#txtValue2').addEventListener("keyup", changeMe);
}

document.addEventListener('DOMContentLoaded', afterLoad);