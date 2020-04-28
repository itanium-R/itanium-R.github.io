
const kansai = document.getElementById("kansai");
const stations = {
  omishiotsu: { name: "近江塩津", x: 900, y: 20 },
  yamashina: { name: "山科", x: 770, y: 150 },
  kusatsu: { name: "草津", x: 840, y: 150 },
  maibara: { name: "米原", x: 900, y: 150 },
  kyoto: { name: "京都", x: 700, y: 150 },
  sonobe: { name: "園部", x: 700, y: 50 },
  shinosaka: { name: "新大阪", x: 400, y: 150 },
  shigino: { name: "鴫野", x: 550, y: 300 },
  osaka: { name: "大阪", x: 400, y: 220 },
  kyobashi: { name: "京橋", x: 480, y: 300 },
  tennoji: { name: "天王寺", x: 380, y: 400 },
  jrnamba: { name: "JR難波", x: 380, y: 340 },
  nishikujo: { name: "西九条", x: 320, y: 300 },
  imamiya: { name: "今宮", x: 320, y: 400 },
  amagasaki: { name: "尼崎", x: 320, y: 220 },
  kitashinchi: { name: "北新地", x: 400, y: 300 },
  kobe: { name: "神戸", x: 250, y: 220 },
  hyogo: { name: "兵庫", x: 200, y: 220 },
  wadamisaki: { name: "和田岬", x: 200, y: 300 },
  kakogawa: { name: "加古川", x: 120, y: 220 },
  tanikawa: { name: "谷川", x: 220, y: 120 },
  aioi: { name: "相生", x: 40, y: 220 },
  banshuako: { name: "播州赤穂", x: 40, y: 300 },
  hanaten: { name: "放出", x: 620, y: 300 },
  kizu: { name: "木津", x: 700, y: 300 },
  nara: { name: "奈良", x: 700, y: 400 },
  kyuhoji: { name: "久宝寺", x: 520, y: 400 },
  oji: { name: "王子", x: 600, y: 400 },
  kamo: { name: "加茂", x: 750, y: 300 },
  tsuge: { name: "柘植", x: 840, y: 300 },
  sakurai: { name: "桜井", x: 700, y: 500 },
  takada: { name: "高田", x: 600, y: 500 },
  otori: { name: "鳳", x: 280, y: 500 },
  hineno: { name: "日根野", x: 210, y: 570 },
  higashihagoromo: { name: "東羽衣", x: 240, y: 460 },
  kansaiairport: { name: "関西空港", x: 150, y: 510 },
  wakayama: { name: "和歌山", x: 140, y: 640 },
  hashimoto: { name: "橋本", x: 460, y: 640 },
};
// st[0]は左(上下なら上)側の駅を指定
const kansaiRoutes = [
  { id: "kosei1", color: "#00a7e3", st: ["yamashina", "omishiotsu"] },

  { id: "hokuriku1", color: "#0071be", st: ["omishiotsu", "maibara"] },

  { id: "ako", color: "#0071be", st: ["aioi", "banshuako"] },

  { id: "tozai1", color: "#e73082", st: ["amagasaki", "kitashinchi"] },
  { id: "tozai2", color: "#e73082", st: ["kitashinchi", "kyobashi"] },

  { id: "fukuchiyama", color: "#fcc800", st: ["tanikawa", "amagasaki"] },
  { id: "kakogawa", color: "#00a684", st: ["kakogawa", "tanikawa"] },

  { id: "osakahigashi1", color: "#3b7293", st: ["shinosaka", "shigino"] },
  { id: "osakahigashi2", color: "#3b7293", st: ["kyuhoji", "hanaten"] },

  { id: "katamachi1", color: "#e73082", st: ["kyobashi", "shigino"] },
  { id: "katamachi2", color: "#e73082", st: ["shigino", "hanaten"] },
  { id: "katamachi3", color: "#e73082", st: ["hanaten", "kizu"] },

  { id: "osakaloop1", color: "#e73042", st: ["nishikujo", "imamiya"] },
  { id: "osakaloop2", color: "#e73042", st: ["nishikujo", "osaka"] },
  { id: "osakaloop3", color: "#e73042", st: ["osaka", "kyobashi"] },
  { id: "osakaloop4", color: "#e73042", st: ["tennoji", "kyobashi"] },

  { id: "kansai1", color: "#00a469", st: ["imamiya", "jrnamba"] },
  { id: "kansai2", color: "#00a469", st: ["imamiya", "tennoji"] },
  { id: "kansai3", color: "#00a469", st: ["tennoji", "kyuhoji"] },
  { id: "kansai4", color: "#00a469", st: ["kyuhoji", "oji"] },
  { id: "kansai5", color: "#00a469", st: ["oji", "nara"] },
  { id: "kansai6", color: "#00a469", st: ["kizu", "nara"] },
  { id: "kansai7", color: "#00a469", st: ["kizu", "kamo"] },
  { id: "kansai8", color: "#4c3a93", st: ["kamo", "tsuge"] },
  { id: "kusatsu", color: "#60ad3b", st: ["kusatsu", "tsuge"] },

  { id: "nara", color: "#bd7b19", st: ["kyoto", "kizu"] },

  { id: "sanin", color: "#7c86c1", st: ["sonobe", "kyoto"] },

  { id: "wakayama1", color: "#f3a8be", st: ["oji", "takada"] },
  { id: "wakayama2", color: "#f3a8be", st: ["hashimoto", "takada"] },
  { id: "wakayama3", color: "#f3a8be", st: ["wakayama", "hashimoto"] },

  { id: "kanku1", color: "#0071be", st: ["kansaiairport", "hineno"] },
  { id: "hanwa9", color: "#f5a200", st: ["higashihagoromo", "otori"] },
  { id: "hanwa1", color: "#f5a200", st: ["wakayama", "hineno"] },
  { id: "hanwa2", color: "#f5a200", st: ["hineno", "otori"] },
  { id: "hanwa3", color: "#f5a200", st: ["otori", "tennoji"] },

  { id: "sakurai1", color: "#cf1225", st: ["nara", "sakurai"] },
  { id: "sakurai2", color: "#cf1225", st: ["takada", "sakurai"] },

  { id: "tokaido1", color: "#0071be", st: ["kusatsu", "maibara"] },
  { id: "tokaido2", color: "#0071be", st: ["yamashina", "kusatsu"] },
  { id: "tokaido3", color: "#0071be", st: ["kyoto", "yamashina"] },
  { id: "tokaido4", color: "#0071be", st: ["shinosaka", "kyoto"] },
  { id: "tokaido5", color: "#0071be", st: ["shinosaka", "osaka"] },
  { id: "tokaido6", color: "#0071be", st: ["amagasaki", "osaka"] },
  { id: "tokaido7", color: "#0071be", st: ["kobe", "amagasaki"] },

  { id: "sanyo1", color: "#0071be", st: ["hyogo", "kobe"] },
  { id: "sanyo2", color: "#0071be", st: ["kakogawa", "hyogo"] },
  { id: "sanyo3", color: "#0071be", st: ["aioi", "kakogawa"] },
  { id: "sanyo9", color: "#0071be", st: ["hyogo", "wadamisaki"] },
];

for (k of kansaiRoutes) {
  let line = document.createElement("div");
  line.id = k.id;
  line.style.position = "absolute";
  let x0 = stations[k.st[0]].x, y0 = stations[k.st[0]].y;
  let x1 = stations[k.st[1]].x, y1 = stations[k.st[1]].y;
  if (x0 === x1 || y0 === y1) {
    line.style.left = (x0 - 10) + "px";
    line.style.top = (y0 - 10) + "px";
    line.style.width = (x1 - x0 + 20) + "px";
    line.style.height = (y1 - y0 + 20) + "px";
  } else if ((x1 - x0) === (y1 - y0) || -(x1 - x0) === (y1 - y0)) {
    line.style.width = "20px";
    let diff = (y1 - y0);
    if (diff > 0) {
      line.style.left = (x0 - 10 + (diff / 2)) + "px";
      line.style.top = (y0 - 20) + "px";
      line.style.height = (y1 - y0 + 20) * 1.2 + "px";
      line.style.transform = "rotate(-45deg)";
    } else {
      line.style.left = (x1 - 10 + (diff / 2)) + "px";
      line.style.top = (y1 - 20) + "px";
      line.style.height = (y0 - y1 + 20) * 1.2 + "px";
      line.style.transform = "rotate(45deg)";
    }
  } else {
    console.error(k.id + " is invalid coordinate.")
    continue;
  }
  line.style.backgroundColor = "#EEE";
  let fillColor = function (e) {
    let t = e.target;
    if (t.style.backgroundColor == "#EEE" || t.style.backgroundColor == "rgb(238, 238, 238)") {
      for (k of kansaiRoutes) {
        if (k.id === t.id) {
          t.style.backgroundColor = k.color;
          break;
        }
      }
    } else {
      t.style.backgroundColor = "#EEE"
    }
  };
  line.style.borderRadius = "10px";
  line.addEventListener("click", fillColor);
  kansai.appendChild(line);
}

for (s of Object.keys(stations)) {
  let st = document.createElement("div");
  st.style.position = "absolute";
  st.style.left = (stations[s].x - 15) + "px";
  st.style.top = (stations[s].y - 15) + "px";
  st.style.width = "24px";
  st.style.height = "24px";
  st.style.backgroundColor = "#FFF";
  st.style.border = "solid 3px #000";
  st.style.borderRadius = "15px";
  kansai.appendChild(st);
  let label = document.createElement("div");
  label.style.position = "absolute";
  label.style.left = (stations[s].x - 50) + "px";
  label.style.top = (stations[s].y + 15) + "px";
  label.style.width = "100px";
  label.style.height = "1px";
  label.style.textAlign = "center";
  label.style.fontSize = "15px";
  label.style.fontWeight = "bold";
  label.innerHTML = stations[s].name;
  label.style.userSelect = "none";
  label.style.textShadow = "1px 1px 0px #FFF, -1px -1px 0px #FFF, " +
    "-1px 1px 0px #FFF, 1px -1px 0px #FFF";
  kansai.appendChild(label);
}