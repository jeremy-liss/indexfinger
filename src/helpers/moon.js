import axios from 'axios';

const getMoon = (size, callback) => {
  const configMoon = {
    lang  		:'en', // 'ca' 'de' 'en' 'es' 'fr' 'it' 'pl' 'pt' 'ru' 'zh' (*)
    month 		:new Date().getMonth() + 1, // 1  - 12
    year  		:new Date().getFullYear(),
    size		:size, //pixels
    lightColor	:"#FFF", //CSS color
    shadeColor	:"#111111", //CSS color
    sizeQuarter	:20, //pixels
    texturize	:true //true - false
  }
  configMoon.LDZ = new Date(configMoon.year,configMoon.month-1,1)/1000

  let gets = []
  for (let i in configMoon){
    gets.push(i+"="+encodeURIComponent(configMoon[i]))
  }
  const url = "http://www.icalendar37.net/lunar/api/?"+gets.join("&")
  axios.get(url)
  .then((res) => {
    callback(res.data);
  })
}


export default getMoon
