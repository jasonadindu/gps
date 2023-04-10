"use strict";

const overlay = document.querySelector(".overlay");
const loading = document.querySelector(".loading");

mapboxgl.accessToken =
"pk.eyJ1IjoiamFzb25hZGluZHUiLCJhIjoiY2xnMTBwZzgwMDJvcjNkb2Y2b2Z6ZnJkYSJ9.ch_rX2LMJH7Smg6T5ajplg";;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [0, 0],
  zoom: 16,
  pitch: 16,
});

map.dragPan.disable();
map.keyboard.disable();
map.scrollZoom.disable();
map.doubleClickZoom.disable();
map.touchZoomRotate.disable();

const marker = new mapboxgl.Marker({
  color: "#3898ff",
});

function getLocation(position) {
  const { latitude, longitude } = position.coords;

  if (longitude && latitude) {
    map.flyTo({
      center: [longitude, latitude],
      essential: true,
      zoom: 16
    });
    marker.setLngLat([longitude, latitude]).addTo(map);
    setTimeout(() => {
      overlay.style.display = "none";
    }, 500);
  }
}

function error() {
  loading.style.animationPlayState = "paused";
  console.log("Unable to retrieve your location");
}

const options = {
  enableHighAccuracy: true,
  maximumAge: 0,
};

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(getLocation, error, options);
} else {
  console.log("Geolocation is not supported by this browser.");
}