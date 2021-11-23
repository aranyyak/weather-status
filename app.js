const input = document.getElementById("city-name");
        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("my-btn").click();
            }
        });

        getLocation();
        setTimeout(() => {
            getWeather();
        }, 100);
        function getWeather() {
            const apiKey = `96e76c81f551ed400dba4652481d5612`
            let city = '';
            const cityName = document.getElementById('city-name').value;
            if (cityName == '' || cityName == null){
                city = document.getElementById('location-show').innerText;
            }
            else{
                city = document.getElementById('city-name').value;
            }
            
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            fetch(url)
            .then(res => res.json())
            .then(data => {
                
                document.getElementById('location-show').innerText = data.name;
                document.getElementById('temp-show').innerText = data.main.temp;
                document.getElementById('weather-show').innerText = data.weather[0].main;
                const imgUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                const imageIcon = document.getElementById('weather-icon');
                imageIcon.setAttribute('src', imgUrl);
                document.getElementById('city-name').value = null;

            })

        }

        function getLocation() {
            fetch('https://api.db-ip.com/v2/free/self')
            .then(res => res.json())
            .then(data => {
                document.getElementById('city-name').value = data.countryName;
            })
        }

        document.addEventListener('click', function(e) { 
         if(document.activeElement.toString() == '[object HTMLButtonElement]'){ 
            document.activeElement.blur(); 
         } 
        })
        