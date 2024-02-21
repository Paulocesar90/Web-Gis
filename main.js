var mapView = new ol.View({
  center: ol.proj.fromLonLat([-45, -30]),
  zoom: 4,
});

var map = new ol.Map({
  target: 'map',
  view: mapView, 
});

var osmTile = new ol.layer.Tile({
  title: "Mapa-Múndi",
  visible: true,
  source: new ol.source.OSM(),
});

map.addLayer(osmTile);

var MunicipiosTile = new ol.layer.Tile({
  title: "Municipios do Brasil",
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/municipios/wms',
    params: { 'LAYERS': "municipios:v_municipios_pg", 'TILED': true },
    serverType: 'geoserver',
    visible: true,
  }),

});

map.addLayer(MunicipiosTile);

var BahiaCafeTile = new ol.layer.Tile({
  title: "Bahia café 2019",
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/bahia/wms?service=WMS',
    params: { 'LAYERS': "bahia:BA_CAFE_19_pg", 'TILED': true },
    serverType: 'geoserver',
    visible: true,
  }),

});

map.addLayer(BahiaCafeTile);

var AeroportosTile = new ol.layer.Tile({
  title: "Aeroportos Brasil",
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/aeroportos/wms?service=WMS',
    params: { 'LAYERS': "aeroportos:v_aeroportos", 'TILED': true },
    serverType: 'geoserver',
    visible: true,
  }),

});

map.addLayer(AeroportosTile);

/*
var layerSwitcher = new ol.control.LayerSwitcher({
    activationMode: 'click',
    startActive: false,
    groupSelectStyle: 'children',
    tipLabel: 'Legenda'
})

map.addControl(layerSwitcher);
*/

function toggleLayer(eve) {
  var lyrname = eve.target.name; 
  var checkedStatus = eve.target.checked;
  var lyrList = map.getLayers();

  lyrList.forEach(function (element) { 
      if (lyrname == element.get('title')) {
          element.setVisible(checkedStatus);
      }
  });
}
