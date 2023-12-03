const fetchDataBtn = document.getElementById("fetchData");
console.log(fetchDataBtn);
const latitudeInputBtn = document.getElementById("latitudeInput");
console.log(latitudeInputBtn);
const longitudeInputBtn = document.getElementById("longitudeInput");
console.log(longitudeInputBtn);
const locationDiv = document.getElementById("location");
const iframeElement = document.getElementById("iframe");
const getFirstPage = document.getElementById("firstPage");
const getSecondPage = document.getElementById("secondPage");

const apiKey = "39c6f0ed474873c6fcaffada66148daa";

fetchDataBtn.addEventListener("click",()=>{
    getFirstPage.style.display = "none";
    getSecondPage.style.display = "block";
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log(navigator.geolocation.getCurrentPosition(showPosition));
    }else{
        latitudeInputBtn.innerText = "Geolocation is not found";
        longitudeInputBtn.innerText = "Geolocation is not found";
    }  
});

function showPosition(position){
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   iframeElement.innerHTML = `<iframe src="https://maps.google.com/maps?q=${latitude}, ${longitude}&output=embed" width="800" height="783" frameborder="0" style="border:0"></iframe>`
   latitudeInputBtn.innerText = position.coords.latitude; 
   longitudeInputBtn.innerText = position.coords.longitude;
    console.log(latitudeInputBtn.innerText);
    console.log(longitudeInputBtn.innerText);
    currentWeather(latitude, longitude)
};


async function currentWeather(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      DisplayData(result);
    } catch (error) {
      console.log(error);
    //   alert("Check Console for Error");
    }
  }


  function DisplayData(result) {
    const locationName = result.name;
    const speed = Math.round(result.wind.speed * 3.6);
    const humidity = result.main.humidity;
    const time = secondsToTimeZoneString(result.timezone);
    const pressure = Math.round(result.main.pressure / 1013.25);
    const direction = degreeToDirection(result.wind.deg);
    const temp = Math.round(result.main.temp - 273.15);
    locationDiv.innerHTML = `<div id="data">
    <p>Location: ${locationName}</p>
  </div>
  <div id="data">
    <p>Wind Speed: ${speed}kmph</p>
  </div>
  <div id="data">
    <p>Humidity : ${humidity}</p>
  </div>
  <div id="data">
    <p>Time Zone : GMT ${time.sign}${time.hours}:${time.minutes}</p>
  </div>
  <div id="data">
    <p>Pressure: ${ pressure} Bar</p>
  </div>
  <div id="data">
    <p>Wind Direction : ${direction}</p>
  </div>
  <div id="data">
    <p>UV Index : ${500}</p>
  </div>
  <div id="data">
    <p>Feels like: ${temp}</p>
  </div>`;
  }

  function secondsToTimeZoneString(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const sign = hours >= 0 ? '+' : '-';
    return {sign, hours: Math.abs(hours), minutes, seconds: remainingSeconds };
  }

  function degreeToDirection(degree) {
    if (degree >= 337.5 || degree < 22.5) {
      return "North";
    } else if (degree >= 22.5 && degree < 67.5) {
      return "North East";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "East";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "South East";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "South";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "South West";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "West";
    } else {
      return "North West";
    }
  }
  

