function save(area, routes) {
  let fullSelectedLines = [];
  for (let rObj of routes) {
    let rElm = document.getElementById(rObj.id);
    let rColor = rElm.style.backgroundColor;
    if (!(rColor == "#EEE" || rColor == "rgb(238, 238, 238)")) {
      fullSelectedLines.push(rObj.id);
    }
  }
  localStorage.setItem('routeAsst' + area, JSON.stringify(fullSelectedLines));
}

function load(area, routes) {
  let fullSelectedLines = [];
  fullSelectedLines = JSON.parse(localStorage.getItem('routeAsst' + area));
  for (let rObj of routes) {
    let rId = rObj.id;
    let rElm = document.getElementById(rId);
    if (fullSelectedLines.includes(rId)) {
      rElm.style.backgroundColor = rObj.color;
    } else {
      rElm.style.backgroundColor = "#EEE";
    }
  }
}