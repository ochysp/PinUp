import * as Leaflet from 'leaflet';

export const pinIcon = new Leaflet.Icon({
  iconUrl: '/img/pin_icon.svg',
  shadowUrl: '/img/pin_icon_shadow.svg',
  iconSize: [60, 54], // size of the icon
  shadowSize: [67, 41], // size of the shadow
  iconAnchor: [2, 52], // point of the icon which will correspond to marker's location
  shadowAnchor: [2, 28], // the same for the shadow
  popupAnchor: [37, -40], // point from which the popup should open relative to the iconAnchor
});

export const postIcon = new Leaflet.Icon({
  iconUrl: '/img/post_icon.svg',
  shadowUrl: '/img/post_icon_shadow.svg',
  iconSize: [40, 42], // size of the icon
  shadowSize: [62, 30], // size of the shadow
  iconAnchor: [20, 41], // point of the icon which will correspond to marker's location
  shadowAnchor: [18, 27], // the same for the shadow
  popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
});
