// Function to get user's timezone based on IP
async function getUserTimezone() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.timezone;
    } catch (error) {
        console.error('Error fetching timezone:', error);
        return Intl.DateTimeFormat().resolvedOptions().timeZone; // Fallback to browser's timezone
    }
}

// Function to populate the timezone dropdown with options
async function populateTimezoneDropdown() {
    const timezoneSelect = document.getElementById('fromTimezone');
    const errorMessage = document.getElementById('error-message');
    
    // Get the user's current timezone using IP
    let userTimezone;
    try {
        userTimezone = await getUserTimezone();
    } catch (e) {
        errorMessage.textContent = "Unable to detect your timezone. Defaulting to UTC.";
        userTimezone = 'UTC';  // Fallback to UTC
    }

    // Timezone options (abbreviated for brevity)
        const timezones = [
            { name: "Afghanistan", value: "Asia/Kabul" },
            { name: "Albania", value: "Europe/Tirane" },
            { name: "Algeria", value: "Africa/Algiers" },
            { name: "Andorra", value: "Europe/Andorra" },
            { name: "Angola", value: "Africa/Luanda" },
            { name: "Argentina", value: "America/Argentina/Buenos_Aires" },
            { name: "Armenia", value: "Asia/Yerevan" },
            { name: "Australia Sydney", value: "Australia/Sydney"},
            { name: "Australia Perth", value: "Australia/Perth" },
            { name: "Austria", value: "Europe/Vienna" },
            { name: "Azerbaijan", value: "Asia/Baku" },
            { name: "Bahamas",  value: "America/Nassau" },
            { name: "Bahrain",  value: "Asia/Bahrain" },
            { name: "Bangladesh",  value: "Asia/Dhaka" },
            { name: "Barbados",  value: "America/Barbados" },
            { name: "Belarus",  value: "Europe/Minsk" },
            { name: "Belgium",  value: "Europe/Brussels" },
            { name: "Belize",  value: "America/Belize" },
            { name: "Benin",  value: "Africa/Porto-Novo" },
            { name: "Bhutan",  value: "Asia/Thimphu" },
            { name: "Bolivia",  value: "America/La_Paz" },
            { name: "Bosnia and Herzegovina",  value: "Europe/Sarajevo" },
            { name: "Botswana",  value: "Africa/Gaborone" },
            { name: "Brazil Sao_Paulo",  value: "America/Sao_Paulo"},
            { name: "Brazil Manaus",  value: "America/Manaus"},
            { name: "Brazil Cuiaba",  value: "America/Cuiaba"},
            { name: "Brunei",  value: "Asia/Brunei" },
            { name: "Bulgaria",  value: "Europe/Sofia" },
            { name: "Burkina Faso",  value: "Africa/Ouagadougou" },
            { name: "Burundi",  value: "Africa/Bujumbura" },
            { name: "Cambodia",  value: "Asia/Phnom_Penh" },
            { name: "Cameroon",  value: "Africa/Douala" },
            { name: "Canada Torronto",  value: "America/Toronto"},
            { name: "Canada Vancouver",  value: "America/Vancouver"},
            { name: "Canada Winnipeg",  value: "America/Winnipeg"},
            { name: "Canada Halifax",  value: "America/Halifax" },
            { name: "Cape Verde",  value: "Atlantic/Cape_Verde" },
            { name: "Central African Republic",  value: "Africa/Bangui" },
            { name: "Chad",  value: "Africa/Ndjamena" },
            { name: "Chile",  value: "America/Santiago" },
            { name: "China",  value: "Asia/Shanghai" },
            { name: "Colombia",  value: "America/Bogota" },
            { name: "Comoros",  value: "Indian/Comoro" },
            { name: "Congo",  value: "Africa/Brazzaville" },
            { name: "Costa Rica",  value: "America/Costa_Rica" },
            { name: "Croatia",  value: "Europe/Zagreb" },
            { name: "Cuba",  value: "America/Havana" },
            { name: "Cyprus",  value: "Asia/Nicosia" },
            { name: "Czech Republic",  value: "Europe/Prague" },
            { name: "Denmark",  value: "Europe/Copenhagen" },
            { name: "Djibouti",  value: "Africa/Djibouti" },
            { name: "Dominica",  value: "America/Dominica" },
            { name: "Dominican Republic",  value: "America/Santo_Domingo" },
            { name: "Ecuador",  value: "America/Guayaquil" },
            { name: "Egypt",  value: "Africa/Cairo" },
            { name: "El Salvador",  value: "America/El_Salvador" },
            { name: "Equatorial Guinea",  value: "Africa/Malabo" },
            { name: "Eritrea",  value: "Africa/Asmara" },
            { name: "Estonia",  value: "Europe/Tallinn" },
            { name: "Eswatini",  value: "Africa/Mbabane" },
            { name: "Ethiopia",  value: "Africa/Addis_Ababa" },
            { name: "Fiji",  value: "Pacific/Fiji" },
            { name: "Finland",  value: "Europe/Helsinki" },
            { name: "France",  value: "Europe/Paris" },
            { name: "Gabon",  value: "Africa/Libreville" },
            { name: "Gambia",  value: "Africa/Banjul" },
            { name: "Georgia",  value: "Asia/Tbilisi" },
            { name: "Germany",  value: "Europe/Berlin" },
            { name: "Ghana",  value: "Africa/Accra" },
            { name: "Greece",  value: "Europe/Athens" },
            { name: "Grenada",  value: "America/Grenada" },
            { name: "Guatemala",  value: "America/Guatemala" },
            { name: "Guinea",  value: "Africa/Conakry" },
            { name: "Guinea-Bissau",  value: "Africa/Bissau" },
            { name: "Guyana",  value: "America/Guyana" },
            { name: "Haiti",  value: "America/Port-au-Prince" },
            { name: "Honduras",  value: "America/Tegucigalpa" },
            { name: "Hungary",  value: "Europe/Budapest" },
            { name: "Iceland",  value: "Atlantic/Reykjavik" },
            { name: "India",  value: "Asia/Kolkata" },
            { name: "Indonesia",  value: "Asia/Jakarta"},
            { name: "Indonesia",  value: "Asia/Jayapura" },
            { name: "Iran",  value: "Asia/Tehran" },
            { name: "Iraq",  value: "Asia/Baghdad" },
            { name: "Ireland",  value: "Europe/Dublin" },
            { name: "Israel",  value: "Asia/Jerusalem" },
            { name: "Italy",  value: "Europe/Rome" },
            { name: "Jamaica",  value: "America/Jamaica" },
            { name: "Japan",  value: "Asia/Tokyo" },
            { name: "Jordan",  value: "Asia/Amman" },
            { name: "Kazakhstan",  value: "Asia/Almaty"},
            { name: "Kazakhstan",  value: "Asia/Qyzylorda" },
            { name: "Kenya",  value: "Africa/Nairobi" },
            { name: "Kiribati",  value: "Pacific/Tarawa" },
            { name: "Kuwait",  value: "Asia/Kuwait" },
            { name: "Kyrgyzstan",  value: "Asia/Bishkek" },
            { name: "Laos",  value: "Asia/Vientiane" },
            { name: "Latvia",  value: "Europe/Riga" },
            { name: "Lebanon",  value: "Asia/Beirut" },
            { name: "Lesotho",  value: "Africa/Maseru" },
            { name: "Liberia",  value: "Africa/Monrovia" },
            { name: "Libya",  value: "Africa/Tripoli" },
            { name: "Liechtenstein",  value: "Europe/Vaduz" },
            { name: "Lithuania",  value: "Europe/Vilnius" },
            { name: "Luxembourg",  value: "Europe/Luxembourg" },
            { name: "Madagascar",  value: "Indian/Antananarivo" },
            { name: "Malawi",  value: "Africa/Blantyre" },
            { name: "Malaysia",  value: "Asia/Kuala_Lumpur" },
            { name: "Maldives",  value: "Indian/Maldives" },
            { name: "Mali",  value: "Africa/Bamako" },
            { name: "Malta",  value: "Europe/Malta" },
            { name: "Marshall Islands",  value: "Pacific/Majuro" },
            { name: "Mauritania",  value: "Africa/Nouakchott" },
            { name: "Mauritius",  value: "Indian/Mauritius" },
            { name: "Mexico",  value: "America/Mexico_City"},
            { name: "Mexico",  value: "America/Tijuana" },
            { name: "Micronesia",  value: "Pacific/Pohnpei" },
            { name: "Moldova",  value: "Europe/Chisinau" },
            { name: "Monaco",  value: "Europe/Monaco" },
            { name: "Mongolia",  value: "Asia/Ulaanbaatar" },
            { name: "Montenegro",  value: "Europe/Podgorica" },
            { name: "Morocco",  value: "Africa/Casablanca" },
            { name: "Mozambique",  value: "Africa/Maputo" },
            { name: "Myanmar",  value: "Asia/Yangon" },
            { name: "Namibia",  value: "Africa/Windhoek" },
            { name: "Nauru",  value: "Pacific/Nauru" },
            { name: "Nepal",  value: "Asia/Kathmandu" },
            { name: "Netherlands",  value: "Europe/Amsterdam" },
            { name: "New Zealand",  value: "Pacific/Auckland" },
            { name: "Nicaragua",  value: "America/Managua" },
            { name: "Niger",  value: "Africa/Niamey" },
            { name: "Nigeria",  value: "Africa/Lagos" },
            { name: "North Korea",  value: "Asia/Pyongyang" },
            { name: "North Macedonia",  value: "Europe/Skopje" },
            { name: "Norway",  value: "Europe/Oslo" },
            { name: "Oman",  value: "Asia/Muscat" },
            { name: "Pakistan",  value: "Asia/Karachi" },
            { name: "Palau",  value: "Pacific/Palau" },
            { name: "Panama",  value: "America/Panama" },
            { name: "Papua New Guinea",  value: "Pacific/Port_Moresby" },
            { name: "Paraguay",  value: "America/Asuncion" },
            { name: "Peru",  value: "America/Lima" },
            { name: "Philippines",  value: "Asia/Manila" },
            { name: "Poland",  value: "Europe/Warsaw" },
            { name: "Portugal",  value: "Europe/Lisbon" },
            { name: "Qatar",  value: "Asia/Qatar" },
            { name: "Romania",  value: "Europe/Bucharest" },
            { name: "Russia",  value: "Europe/Moscow"},
            { name: "Russia",  value: "Asia/Vladivostok"},
            { name: "Russia",  value: "Asia/Yekaterinburg" },
            { name: "Rwanda",  value: "Africa/Kigali" },
            { name: "Saint Kitts and Nevis",  value: "America/St_Kitts" },
            { name: "Saint Lucia",  value: "America/St_Lucia" },
            { name: "Saint Vincent and the Grenadines",  value: "America/St_Vincent" },
            { name: "Samoa",  value: "Pacific/Apia" },
            { name: "San Marino",  value: "Europe/San_Marino" },
            { name: "Sao Tome and Principe",  value: "Africa/Sao_Tome" },
            { name: "Saudi Arabia",  value: "Asia/Riyadh" },
            { name: "Senegal",  value: "Africa/Dakar" },
            { name: "Serbia",  value: "Europe/Belgrade" },
            { name: "Seychelles",  value: "Indian/Mahe" },
            { name: "Sierra Leone",  value: "Africa/Freetown" },
            { name: "Singapore",  value: "Asia/Singapore" },
            { name: "Slovakia",  value: "Europe/Bratislava" },
            { name: "Slovenia",  value: "Europe/Ljubljana" },
            { name: "Solomon Islands",  value: "Pacific/Guadalcanal" },
            { name: "Somalia",  value: "Africa/Mogadishu" },
            { name: "South Africa",  value: "Africa/Johannesburg" },
            { name: "South Korea",  value: "Asia/Seoul" },
            { name: "South Sudan",  value: "Africa/Juba" },
            { name: "Spain",  value: "Europe/Madrid" },
            { name: "Sri Lanka",  value: "Asia/Colombo" },
            { name: "Sudan",  value: "Africa/Khartoum" },
            { name: "Suriname",  value: "America/Paramaribo" },
            { name: "Sweden",  value: "Europe/Stockholm" },
            { name: "Switzerland",  value: "Europe/Zurich" },
            { name: "Syria",  value: "Asia/Damascus" },
            { name: "Taiwan",  value: "Asia/Taipei" },
            { name: "Tajikistan",  value: "Asia/Dushanbe" },
            { name: "Tanzania",  value: "Africa/Dar_es_Salaam" },
            { name: "Thailand",  value: "Asia/Bangkok" },
            { name: "Togo",  value: "Africa/Lome" },
            { name: "Tonga",  value: "Pacific/Tongatapu" },
            { name: "Trinidad and Tobago",  value: "America/Port_of_Spain" },
            { name: "Tunisia",  value: "Africa/Tunis" },
            { name: "Turkey",  value: "Europe/Istanbul" },
            { name: "Turkmenistan",  value: "Asia/Ashgabat" },
            { name: "Tuvalu",  value: "Pacific/Funafuti" },
            { name: "Uganda",  value: "Africa/Kampala" },
            { name: "Ukraine",  value: "Europe/Kiev" },
            { name: "United Arab Emirates",  value: "Asia/Dubai" },
            { name: "United Kingdom",  value: "Europe/London" },
            { name: "United States New York", value: "America/New_York"},
            { name: "United States Chicago", value: "America/Chicago"},
            { name: "United States Denver", value: "America/Denver"},
            { name: "United States Los Angeles", value: "America/Los_Angeles"},
            { name: "Uruguay",  value: "America/Montevideo" },
            { name: "Uzbekistan",  value: "Asia/Tashkent" },
            { name: "Vanuatu",  value: "Pacific/Efate" },
            { name: "Vatican City",  value: "Europe/Vatican" },
            { name: "Venezuela",  value: "America/Caracas" },
            { name: "Vietnam",  value: "Asia/Ho_Chi_Minh" },
            { name: "Yemen",  value: "Asia/Aden" },
            { name: "Zambia",  value: "Africa/Lusaka" },
            { name: "Zimbabwe",  value: "Africa/Harare" },
            { name: "UTC", value: "UTC" },
        ];

    // Populate the dropdown and set the default value to the user's timezone
    timezones.forEach((timezone) => {
        const option = document.createElement('option');
        option.value = timezone.value;
        option.textContent = timezone.name;
        if (timezone.value === userTimezone) {
            option.selected = true;
        }
        timezoneSelect.appendChild(option);
    });

    const toTimezoneSelect = document.getElementById('toTimezone');

    timezones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz.value;
        option.textContent = tz.name;
        toTimezoneSelect.appendChild(option);
    });
}

function setLocalTime() {
    const localTimeInput = document.getElementById('localTime');
    const errorMessage = document.getElementById('error-message');
    const fromTimezoneSelect = document.getElementById('fromTimezone');
    
    try {
        const selectedTimezone = fromTimezoneSelect.value;
        const currentDate = new Date();
        const options = { 
            timeZone: selectedTimezone,
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        };
        const timeString = currentDate.toLocaleTimeString('en-US', options);
        localTimeInput.value = timeString;
    } catch (e) {
        errorMessage.textContent = "Unable to set local time for the selected timezone. Defaulting to 12:00.";
        localTimeInput.value = "12:00";
    }
}

// Function to update local time continuously
function updateLocalTime() {
    setLocalTime(); // This will set the time to the current time in the selected timezone
    convertTime(); // This will update the converted time
}

// Function to get currency code based on timezone
function getCurrencyCode(timezone) {
    const currencyMap = {
        "Asia/Kabul": "AFN",
        "Europe/Tirane": "ALL",
        "Africa/Algiers": "DZD",
        "Europe/Andorra": "EUR",
        "Africa/Luanda": "AOA",
        "America/Argentina/Buenos_Aires": "ARS",
        "Asia/Yerevan": "AMD",
        "Australia/Sydney": "AUD",
        "Australia/Perth": "AUD",
        "Europe/Vienna": "EUR",
        "Asia/Baku": "AZN",
        "America/Nassau": "BSD",
        "Asia/Bahrain": "BHD",
        "Asia/Dhaka": "BDT",
        "America/Barbados": "BBD",
        "Europe/Minsk": "BYN",
        "Europe/Brussels": "EUR",
        "America/Belize": "BZD",
        "Africa/Porto-Novo": "XOF",
        "Asia/Thimphu": "BTN",
        "America/La_Paz": "BOB",
        "Europe/Sarajevo": "BAM",
        "Africa/Gaborone": "BWP",
        "America/Sao_Paulo": "BRL",
        "America/Manaus": "BRL",
        "America/Cuiaba": "BRL",
        "Asia/Brunei": "BND",
        "Europe/Sofia": "BGN",
        "Africa/Ouagadougou": "XOF",
        "Africa/Bujumbura": "BIF",
        "Asia/Phnom_Penh": "KHR",
        "Africa/Douala": "XAF",
        "America/Toronto": "CAD",
        "America/Vancouver": "CAD",
        "America/Winnipeg": "CAD",
        "America/Halifax": "CAD",
        "Atlantic/Cape_Verde": "CVE",
        "Africa/Bangui": "XAF",
        "Africa/Ndjamena": "XAF",
        "America/Santiago": "CLP",
        "Asia/Shanghai": "CNY",
        "America/Bogota": "COP",
        "Indian/Comoro": "KMF",
        "Africa/Brazzaville": "XAF",
        "America/Costa_Rica": "CRC",
        "Europe/Zagreb": "HRK",
        "America/Havana": "CUP",
        "Asia/Nicosia": "EUR",
        "Europe/Prague": "CZK",
        "Europe/Copenhagen": "DKK",
        "Africa/Djibouti": "DJF",
        "America/Dominica": "XCD",
        "America/Santo_Domingo": "DOP",
        "America/Guayaquil": "USD",
        "Africa/Cairo": "EGP",
        "America/El_Salvador": "USD",
        "Africa/Malabo": "XAF",
        "Africa/Asmara": "ERN",
        "Europe/Tallinn": "EUR",
        "Africa/Mbabane": "SZL",
        "Africa/Addis_Ababa": "ETB",
        "Pacific/Fiji": "FJD",
        "Europe/Helsinki": "EUR",
        "Europe/Paris": "EUR",
        "Africa/Libreville": "XAF",
        "Africa/Banjul": "GMD",
        "Asia/Tbilisi": "GEL",
        "Europe/Berlin": "EUR",
        "Africa/Accra": "GHS",
        "Europe/Athens": "EUR",
        "America/Grenada": "XCD",
        "America/Guatemala": "GTQ",
        "Africa/Conakry": "GNF",
        "Africa/Bissau": "XOF",
        "America/Guyana": "GYD",
        "America/Port-au-Prince": "HTG",
        "America/Tegucigalpa": "HNL",
        "Europe/Budapest": "HUF",
        "Atlantic/Reykjavik": "ISK",
        "Asia/Kolkata": "INR",
        "Asia/Jakarta": "IDR",
        "Asia/Jayapura": "IDR",
        "Asia/Tehran": "IRR",
        "Asia/Baghdad": "IQD",
        "Europe/Dublin": "EUR",
        "Asia/Jerusalem": "ILS",
        "Europe/Rome": "EUR",
        "America/Jamaica": "JMD",
        "Asia/Tokyo": "JPY",
        "Asia/Amman": "JOD",
        "Asia/Almaty": "KZT",
        "Asia/Qyzylorda": "KZT",
        "Africa/Nairobi": "KES",
        "Pacific/Tarawa": "AUD",
        "Asia/Kuwait": "KWD",
        "Asia/Bishkek": "KGS",
        "Asia/Vientiane": "LAK",
        "Europe/Riga": "EUR",
        "Asia/Beirut": "LBP",
        "Africa/Maseru": "LSL",
        "Africa/Monrovia": "LRD",
        "Africa/Tripoli": "LYD",
        "Europe/Vaduz": "CHF",
        "Europe/Vilnius": "EUR",
        "Europe/Luxembourg": "EUR",
        "Indian/Antananarivo": "MGA",
        "Africa/Blantyre": "MWK",
        "Asia/Kuala_Lumpur": "MYR",
        "Indian/Maldives": "MVR",
        "Africa/Bamako": "XOF",
        "Europe/Malta": "EUR",
        "Pacific/Majuro": "USD",
        "Africa/Nouakchott": "MRU",
        "Indian/Mauritius": "MUR",
        "America/Mexico_City": "MXN",
        "America/Tijuana": "MXN",
        "Pacific/Pohnpei": "USD",
        "Europe/Chisinau": "MDL",
        "Europe/Monaco": "EUR",
        "Asia/Ulaanbaatar": "MNT",
        "Europe/Podgorica": "EUR",
        "Africa/Casablanca": "MAD",
        "Africa/Maputo": "MZN",
        "Asia/Yangon": "MMK",
        "Africa/Windhoek": "NAD",
        "Pacific/Nauru": "AUD",
        "Asia/Kathmandu": "NPR",
        "Europe/Amsterdam": "EUR",
        "Pacific/Auckland": "NZD",
        "America/Managua": "NIO",
        "Africa/Niamey": "XOF",
        "Africa/Lagos": "NGN",
        "Asia/Pyongyang": "KPW",
        "Europe/Skopje": "MKD",
        "Europe/Oslo": "NOK",
        "Asia/Muscat": "OMR",
        "Asia/Karachi": "PKR",
        "Pacific/Palau": "USD",
        "America/Panama": "PAB",
        "Pacific/Port_Moresby": "PGK",
        "America/Asuncion": "PYG",
        "America/Lima": "PEN",
        "Asia/Manila": "PHP",
        "Europe/Warsaw": "PLN",
        "Europe/Lisbon": "EUR",
        "Asia/Qatar": "QAR",
        "Europe/Bucharest": "RON",
        "Europe/Moscow": "RUB",
        "Asia/Vladivostok": "RUB",
        "Asia/Yekaterinburg": "RUB",
        "Africa/Kigali": "RWF",
        "America/St_Kitts": "XCD",
        "America/St_Lucia": "XCD",
        "America/St_Vincent": "XCD",
        "Pacific/Apia": "WST",
        "Europe/San_Marino": "EUR",
        "Africa/Sao_Tome": "STN",
        "Asia/Riyadh": "SAR",
        "Africa/Dakar": "XOF",
        "Europe/Belgrade": "RSD",
        "Indian/Mahe": "SCR",
        "Africa/Freetown": "SLL",
        "Asia/Singapore": "SGD",
        "Europe/Bratislava": "EUR",
        "Europe/Ljubljana": "EUR",
        "Pacific/Guadalcanal": "SBD",
        "Africa/Mogadishu": "SOS",
        "Africa/Johannesburg": "ZAR",
        "Asia/Seoul": "KRW",
        "Africa/Juba": "SSP",
        "Europe/Madrid": "EUR",
        "Asia/Colombo": "LKR",
        "Africa/Khartoum": "SDG",
        "America/Paramaribo": "SRD",
        "Europe/Stockholm": "SEK",
        "Europe/Zurich": "CHF",
        "Asia/Damascus": "SYP",
        "Asia/Taipei": "TWD",
        "Asia/Dushanbe": "TJS",
        "Africa/Dar_es_Salaam": "TZS",
        "Asia/Bangkok": "THB",
        "Africa/Lome": "XOF",
        "Pacific/Tongatapu": "TOP",
        "America/Port_of_Spain": "TTD",
        "Africa/Tunis": "TND",
        "Europe/Istanbul": "TRY",
        "Asia/Ashgabat": "TMT",
        "Pacific/Funafuti": "AUD",
        "Africa/Kampala": "UGX",
        "Europe/Kyiv": "UAH",
        "Asia/Dubai": "AED",
        "Europe/London": "GBP",
        "America/New_York": "USD",
        "America/Los_Angeles": "USD",
        "America/Chicago": "USD",
        "America/Denver": "USD",
        "America/Montevideo": "UYU",
        "Asia/Tashkent": "UZS",
        "Pacific/Efate": "VUV",
        "Europe/Vatican": "EUR",
        "America/Caracas": "VES",
        "Asia/Hanoi": "VND",
        "Asia/Ho_Chi_Minh": "VND",
        "Pacific/Wallis": "XPF",
        "Asia/Aden": "YER",
        "Africa/Lusaka": "ZMW",
        "Africa/Harare": "ZWL"
    };

    for (const [region, currency] of Object.entries(currencyMap)) {
        if (timezone.startsWith(region)) {
            return currency;
        }
    }
    return 'USD'; // Default to USD if no match found
}

// Function to fetch exchange rates
async function fetchExchangeRate(fromCurrency, toCurrency) {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        return data.rates[toCurrency];
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        return null;
    }
}

// Updated convertTime function to include currency conversion
async function convertTime() {
    const localTime = document.getElementById('localTime').value;
    const fromTimezone = document.getElementById('fromTimezone').value;
    const toTimezone = document.getElementById('toTimezone').value;
    const errorMessage = document.getElementById('error-message');
    const showtime = document.getElementById('showtime');
    const showcurrency = document.getElementById('showcurrency');
    const convertedTime = document.getElementById('convertedTime');
    const convertedCurrency = document.getElementById('convertedCurrency');

    // Validate inputs
    if (!localTime || !fromTimezone || !toTimezone) {
        errorMessage.textContent = "Please fill in all fields.";
        return;
    }

    const [hours, minutes] = localTime.split(':');
    
    // Check if the input is valid time format
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        errorMessage.textContent = "Invalid time format. Please use HH:MM.";
        return;
    }

    const currentDate = new Date();
    currentDate.setHours(parseInt(hours), parseInt(minutes));

    try {
        // Convert the time to the "from" timezone
        const fromTime = new Date(currentDate.toLocaleString("en-US", { timeZone: fromTimezone }));
        // Convert the time from "fromTimezone" to "toTimezone"
        const convertedTimeObj = new Date(fromTime.toLocaleString("en-US", { timeZone: toTimezone }));

        // Format the converted time as HH:MM
        const hoursConverted = convertedTimeObj.getHours().toString().padStart(2, '0');
        const minutesConverted = convertedTimeObj.getMinutes().toString().padStart(2, '0');

        // Display the converted time
        if (showtime) showtime.style.display = 'block';
        if (convertedTime) convertedTime.innerHTML = `<h3>${toTimezone}: ${hoursConverted}:${minutesConverted}</h3>`;
        
        // Get currency codes based on timezones
        const fromCurrency = getCurrencyCode(fromTimezone);
        const toCurrency = getCurrencyCode(toTimezone);

        // Fetch and display exchange rate
        const exchangeRate = await fetchExchangeRate(fromCurrency, toCurrency);
        if (exchangeRate) {
            if (showcurrency) showcurrency.style.display = 'block';
            if (convertedCurrency) convertedCurrency.innerHTML = `<h3>1 ${fromCurrency} = ${exchangeRate.toFixed(2)} ${toCurrency}</h3>`;
        } else {
            if (showcurrency) showcurrency.style.display = 'none';
            errorMessage.textContent += " Unable to fetch currency conversion.";
        }

        // Clear any previous error message
        errorMessage.textContent = "";

    } catch (error) {
        console.error(error);
        errorMessage.textContent = "Error converting time. Please check your inputs and try again.";
    }
}

// Populate the timezones when the page loads, set local time, and start updating
window.onload = async () => {
    await populateTimezoneDropdown();
    setLocalTime();
    
    // Add event listener for fromTimezone change
    const fromTimezoneSelect = document.getElementById('fromTimezone');
    fromTimezoneSelect.addEventListener('change', setLocalTime);
    
    // Update local time and convert time every second
    setInterval(updateLocalTime, 1000);
};