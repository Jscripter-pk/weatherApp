window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDegree = document.getElementsByClassName('temperature-degree');
    let temperatureDescription = document.getElementsByClassName('temperature-descrition');
    let timezone = document.getElementsByClassName('location-Timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/YOUR_API_KEY/${lat},${long}`;  //get your api key from darksky website
            
            setInterval(() => {
                fetch(api)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature,summary,icon} =  data.currently;
                    
                    temperatureDegree[0].textContent = Math.round((temperature -32) * 5/9,2);
                    temperatureDescription[0].textContent = summary;
                    timezone[0].textContent = data.timezone;

                    setIcons(icon,document.querySelector("#icon"));
                    document.querySelector('#degrees').addEventListener('click' , () => {
                        document.querySelector('#unit').textContent = "'F";
                        temperatureDegree[0].textContent = temperature;
                    });
                });
            

        },500);
    });
}
    
    function setIcons(icon, iconId){
        const skycons = new Skycons({color: "grey"});
        const currentIcon = icon.replace(/-/g,"_");
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon.toUpperCase()]);
    }
});