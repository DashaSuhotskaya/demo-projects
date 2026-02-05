export default function getLocationCity(){
    const locationCitySublinks =document.querySelectorAll('.location__sublink');
    const locationCityName = document.querySelector('.location__city-name');
    const locationCityBtn = document.querySelector('.location__city');

    locationCityBtn.addEventListener('click', function (e) {
        locationCityBtn.classList.toggle("location__city--active");
    });

    locationCitySublinks.forEach(btn => {
        btn.addEventListener('click', function (e) {
            locationCityName.textContent = btn.textContent;
            locationCityBtn.classList.remove("location__city--active");
        });
    });
}