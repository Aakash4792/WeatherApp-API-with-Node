const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.display');
const time = document.querySelector('.time');
const icon = document.querySelector('.iconImg');

const updateUI = (data) => {

    let name = data.name;
    let weatherText = data.weatherText;
    let temp = data.temp;
    let dayTime = data.dayTime;

    details.innerHTML = `
        <h3>${name}</h3>
        <div class="t2">
            ${weatherText}
        </div>
        <div class="t3">
            <span>${temp}</span>
            <span>&deg;C</span>
        </div>
    `;

    let timeSrc = dayTime?'dayfinal.jpg':'nightfinal.jpg';
    time.setAttribute('src',timeSrc);

    if(card.classList.contains('hide')){
        card.classList.remove('hide');
    }

}
const updateCity = async(cityName) => {
    const response = await fetch(`/getDetails/${cityName}`,{method:"GET"});
    const data = await response.json();
    return data;
}

cityForm.addEventListener('submit',e=>{
    e.preventDefault();

    const cityName = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(cityName).then(data=>{
        updateUI(data);
    }).catch(err=>{
        console.log(err);
    })
})

