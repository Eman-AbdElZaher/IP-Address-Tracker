// [01]-Declaring variables
const ipValue= document.querySelector('#ipInput');
const alertBox = document.querySelector('.alert');
const Ip = document.querySelector('#ip-address');
const loc = document.querySelector('#loc');
const Utc = document.querySelector('#Timezone');
const isp = document.querySelector('#isp');
const map = L.map('map').setView([37.7749, -122.4194], 7);


let init =()=>{
 getDataFromApi('');
}
function getLocationOnMap(lng,lat){ 
 let markerIcon = L.icon({
        iconUrl: "images/icon-location.svg",
        iconSize: [46, 56], // size of the icon
        iconAnchor: [23, 55],
      });
      map.setView([lat,lng], 17);

      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: false,
      }).addTo(map);

      L.marker([lat, lng], { icon: markerIcon }).addTo(map);
}
async function getDataFromApi(ip){
 await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_6OQGCPB5AriYAs5daEqRQUM68utpL&ipAddress=${ip}`).
 then(response => response.json())
 .then(data => {
     Ip.innerHTML = data.ip;
     loc.innerHTML = `${data.location.country}, ${data.location.city}`;
     Utc.innerHTML = 'UTC'+data.location.timezone;
     isp.innerHTML = data.isp;
     getLocationOnMap(data.location.lng,data.location.lat);
 });
}
window.addEventListener('load',init);
document.querySelector('#submit').addEventListener('click',(e) => {
   e.preventDefault();
   if (
    ipValue.value.match(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    )
  ) {
        let ip=ipValue.value;
        getDataFromApi(ip);
        ipValue.value='';
    }
    else
    {
      alertBox.classList.toggle('opened'); 
    }
});