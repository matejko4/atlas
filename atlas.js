const countrieslist = document.getElementById("countries-list");
const continent = document.getElementById("continent");
const modalHead = document.getElementById("modal-header")
const modalBody = document.getElementById("modal-body-content");
const modal = new bootstrap.Modal(document.getElementById("one-country"));


function loadCountries(region) {
    countrieslist.innerHTML = "";
    fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then(res => res.json())
    .then(data => {
        data.forEach(
        (country) =>{
            
            let blockCountry = `
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div class="card">
                <img class="card-img-top" src="${country.flags.png} " alt="Czech" />
                <div class="card-body">
                    <h4 class="card-title"><a href="#">${country.translations.ces.common}</a></h4>
                    <p class="card-text">Hlavní město:  <b>${country.capital[0]}</b></p>
                    <p><button type="button" class="btn btn-info"
                        data-name="${country.name.common}">Informace</button></p>
                            </div>
                        </div>
                    </div>
                    `;
                    countrieslist.innerHTML += blockCountry; 
        });
document.querySelectorAll('button[data-name]').forEach(button => {
            button.addEventListener('click', () => {
                const countryname = button.getAttribute("data-name");
                modal.show();
                fetch(`https://restcountries.com/v3.1/name/${countryname}?fullText=true`)
                .then(res => res.json())
                .then(data => {
                    const country = data[0];

                    modalHead.innerHTML = `
                    <h3>${country.translations.ces.common}</h3>
                    `;

                    const currencyCode = Object.keys(country.currencies)[0];
                    const currency = country.currencies[currencyCode];

                    modalBody.innerHTML = `
                    <h5>Hlavní město: <b>${country.capital[0]}</b></h5>
                    <p>Rozloha: <b>${country.area} km&sup2</b></p>
                    <p>Počet obyvatel: <b>${country.population}</b></p>
                    <p>Hraničí s: <b>${country.borders}</b></p>
                    <p>Časové pásmo: <b>${country.timezones}</b></p>
                    <p>Měna: <b>${currency.name} ${currency.symbol}</b></p>
                    `;
                })
                .catch(error => {
                    console.log("Error")
                })
            });
        });
})
    .catch(error => {
        console.log("error");
    });
}



loadCountries();

continent.addEventListener("change", function(event){
    loadCountries(event.target.value);
})

