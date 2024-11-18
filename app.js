const countrySelect = document.getElementById("country");
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");
const form = document.getElementById("locationForm");
const result = document.getElementById("result");

const countryList = [
    {
        "country": "United States",
        "states": [
            {
                "statename": "California",
                "cities": ["Los Angeles", "San Francisco", "San Diego"]
            },
            {
                "statename": "New York",
                "cities": ["New York City", "Buffalo", "Albany"]
            },
            {
                "statename": "Texas",
                "cities": ["Houston", "Dallas", "Austin"]
            }
        ]
    },
    {
        "country": "Canada",
        "states": [
            {
                "statename": "Ontario",
                "cities": ["Toronto", "Ottawa", "Hamilton"]
            },
            {
                "statename": "British Columbia",
                "cities": ["Vancouver", "Victoria", "Kelowna"]
            },
            {
                "statename": "Quebec",
                "cities": ["Montreal", "Quebec City", "Sherbrooke"]
            }
        ]
    },
    {
        "country": "Australia",
        "states": [
            {
                "statename": "New South Wales",
                "cities": ["Sydney", "Newcastle", "Wollongong"]
            },
            {
                "statename": "Victoria",
                "cities": ["Melbourne", "Geelong", "Ballarat"]
            },
            {
                "statename": "Queensland",
                "cities": ["Brisbane", "Gold Coast", "Cairns"]
            }
        ]
    },
    {
        "country": "UK",
        "states": [
            {
                "statename": "England",
                "cities": ["London", "Manchester", "Birmingham"]
            },
            {
                "statename": "Scotland",
                "cities": ["Edinburgh", "Glasgow", "Aberdeen"]
            },
            {
                "statename": "Wales",
                "cities": ["Cardiff", "Swansea", "Newport"]
            }
        ]
    },
    {
        "country": "Germany",
        "states": [
            {
                "statename": "Bavaria",
                "cities": ["Munich", "Nuremberg", "Augsburg"]
            },
            {
                "statename": "Berlin",
                "cities": ["Berlin", "Potsdam", "Spandau"]
            },
            {
                "statename": "Hesse",
                "cities": ["Frankfurt", "Wiesbaden", "Darmstadt"]
            }
        ]
    },
    {
        "country": "Japan",
        "states": [
            {
                "statename": "Kanto",
                "cities": ["Tokyo", "Yokohama", "Saitama"]
            },
            {
                "statename": "Kansai",
                "cities": ["Osaka", "Kyoto", "Kobe"]
            },
            {
                "statename": "Hokkaido",
                "cities": ["Sapporo", "Hakodate", "Asahikawa"]
            }
        ]
    },
    {
        "country": "Brazil",
        "states": [
            {
                "statename": "São Paulo",
                "cities": ["São Paulo", "Campinas", "Santos"]
            },
            {
                "statename": "Rio de Janeiro",
                "cities": ["Rio de Janeiro", "Niterói", "Petrópolis"]
            },
            {
                "statename": "Bahia",
                "cities": ["Salvador", "Feira de Santana", "Ilhéus"]
            }
        ]
    },
    {
        "country": "South Africa",
        "states": [
            {
                "statename": "Gauteng",
                "cities": ["Johannesburg", "Pretoria", "Soweto"]
            },
            {
                "statename": "Western Cape",
                "cities": ["Cape Town", "Stellenbosch", "George"]
            },
            {
                "statename": "KwaZulu-Natal",
                "cities": ["Durban", "Pietermaritzburg", "Richards Bay"]
            }
        ]
    },
    {
        "country": "Pakistan",
        "states": [
            {
                "statename": "Punjab",
                "cities": ["Lahore", "Faisalabad", "Rawalpindi"]
            },
            {
                "statename": "Sindh",
                "cities": ["Karachi", "Hyderabad", "Sukkur"]
            },
            {
                "statename": "Khyber Pakhtunkhwa",
                "cities": ["Peshawar", "Mardan", "Abbottabad"]
            }
        ]
    },
    {
        "country": "Turkey",
        "states": [
            {
                "statename": "Istanbul",
                "cities": ["Istanbul", "Üsküdar", "Kadıköy"]
            },
            {
                "statename": "Ankara",
                "cities": ["Ankara", "Çankaya", "Keçiören"]
            },
            {
                "statename": "Izmir",
                "cities": ["Izmir", "Bornova", "Karşıyaka"]
            }
        ]
    },
    {
        "country": "Saudi Arabia",
        "states": [
            {
                "statename": "Riyadh Region",
                "cities": ["Riyadh", "Al-Kharj", "Ad-Dirʿiyya"]
            },
            {
                "statename": "Makkah Region",
                "cities": ["Mecca", "Jeddah", "Taif"]
            },
            {
                "statename": "Eastern Province",
                "cities": ["Dammam", "Dhahran", "Al-Khobar"]
            }
        ]
    },
    {
        "country": "India",
        "states": [
            {
                "statename": "Maharashtra",
                "cities": ["Mumbai", "Pune", "Nagpur"]
            },
            {
                "statename": "Tamil Nadu",
                "cities": ["Chennai", "Coimbatore", "Madurai"]
            },
            {
                "statename": "Karnataka",
                "cities": ["Bangalore", "Mysore", "Hubli"]
            }
        ]
    }
];

function populateSelect(select, options, defaultText = "Select an option") {
    select.innerHTML = `<option value="" disabled selected>${defaultText}</option>`;
    options.forEach((option, index) => {
        select.innerHTML += `<option value="${index}">${option}</option>`;
    });
}

function enableSelect(select) {
    select.disabled = false;
}

function disableSelect(select) {
    select.disabled = true;
    select.innerHTML = `<option value="" disabled selected>Select an option</option>`;
}

function fetchCountryList() {
    const countries = countryList.map(country => country.country);
    populateSelect(countrySelect, countries, "Select Country");
}

countrySelect.addEventListener("change", function () {
    const countryIndex = this.value;
    const states = countryList[countryIndex].states.map(state => state.statename);
    populateSelect(stateSelect, states, "Select State/Province");
    enableSelect(stateSelect);
    disableSelect(citySelect);
});

stateSelect.addEventListener("change", function () {
    const countryIndex = countrySelect.value;
    const stateIndex = this.value;
    const cities = countryList[countryIndex].states[stateIndex].cities;
    populateSelect(citySelect, cities, "Select City");
    enableSelect(citySelect);
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const country = countryList[countrySelect.value].country;
    const state = countryList[countrySelect.value].states[stateSelect.value].statename;
    const city = citySelect.options[citySelect.selectedIndex].text;
    
    result.innerHTML = `
        <h2>Selected Location:</h2>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>State/Province:</strong> ${state}</p>
        <p><strong>City:</strong> ${city}</p>
    `;
    result.classList.remove("hidden");
});

fetchCountryList();