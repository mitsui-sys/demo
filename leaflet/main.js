let jsondata = [
  {
    name: "淡色地図",
    link: "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
    attrbution:
      "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>",
  },
  {
    name: "標準地図",
    link: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
    attrbution:
      "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>",
  },
  {
    name: "OpenStreetMap",
    link: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attrbution:
      "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors",
  },
  {
    name: "色別標高図",
    link: "https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png",
    attrbution:
      "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>",
  },
  {
    name: "陰影起伏図",
    link: "http://cyberjapandata.gsi.go.jp/xyz/hillshademap/{z}/{x}/{y}.png",
    attrbution:
      "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>",
  },
  {
    name: "写真",
    link: "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
    attrbution:
      "<a href='http://maps.gsi.go.jp/development/ichiran.html'>地理院タイル</a>",
  },
];

let center = [35.6707, 139.7852];

let baseMaps = {};
let overlayMaps = {};
for (let i in jsondata) {
  const d = jsondata[i];
  //   data[d.name] = L.tileLayer(d.link, { attrbution: d.attrbution }).addTo(map);
  if (i < 3) {
    baseMaps[d.name] = L.tileLayer(d.link, { attrbution: d.attrbution });
  } else {
    overlayMaps[d.name] = L.tileLayer(d.link, { attrbution: d.attrbution });
  }
  console.log(jsondata[i]);
}

let maps = [];
for (let i = 0; i < 4; i++) {
  let map = L.map(
    `mapid_${i + 1}`,
    L.extend({
      zoom: 15,
      center: center,
    })
  );
  L.control.layers(baseMaps, overlayMaps).addTo(map);
  map.zoomControl.setPosition("bottomright");
  L.control
    .scale({
      imperial: false,
      metric: true,
    })
    .addTo(map);

  // 円を描く
  var Circle = L.circle(center, 500, {
    color: "#FF0000",
    weight: 3,
    opacity: 0.8,
    fillColor: "#FF0000",
    fillOpacity: 0.3,
  }).addTo(map);

  // クリックイベント
  let popup = L.popup();
  map.on("click", (e) => {
    console.log(e.latlng);
    let str = e.latlng.lat + ", " + e.latlng.lng;
    popup.setLatLng(e.latlng).setContent(str).openOn(map);
  });

  L.marker(map.getCenter()).addTo(map);
}

// let data = {};
// for (let i in jsondata) {
//   const d = jsondata[i];
//   //   data[d.name] = L.tileLayer(d.link, { attrbution: d.attrbution }).addTo(map);
//   data[d.name] = L.tileLayer(d.link, { attrbution: d.attrbution });
//   console.log(jsondata[i]);
// }

// L.control.layers(data).addTo(map);
