const apiKey="4bb60f958f1de983e4273b4f6ddf75d8";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// const city=document.getElementById("city");       //it is for city.innerHTML=data.name; 


const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let hours;
let meridian;
function getFormattedDate() {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  if(date.getHours()>12){
    meridian="PM";
  }else meridian="AM"
  if(date.getHours()>12){
    hours =date.getHours()-12;
  }else hours=date.getHours();

  const min = date.getMinutes();

  return {
    dayOfWeek: days[day],
    date: date.getDate(),
    month,
    year,
    hours,
    min,
    meridian,
  };
}


async function checkWeather(city){
    const response=await fetch(apiUrl+city+`&appid=${apiKey}`);
    var data=await response.json();
    console.log(data);
    // city.innerHTML=data.name;               //it also working
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=data.main.temp+"&deg;C";
    document.querySelector(".humidity").innerHTML=data.main.humidity +"%";
    document.querySelector(".wind").innerHTML=data.wind.speed+" km/h";
    const icon = data.weather[0].icon;
    const location=document.querySelector(".weather-icon");
    location.src="http://openweathermap.org/img/w/"+icon+".png";
   
    
    const { dayOfWeek, date, month, year, hours, min,meridian } = getFormattedDate();
    document.getElementById("day-date").innerHTML = dayOfWeek+" | "+date+"/"+month+"/"+year+" | "+hours+":"+min+" "+meridian;
    
}
searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})

