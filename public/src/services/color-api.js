import store from './store.js';

const COLOR_API = 'http://www.thecolorapi.com/scheme';

const token = store.getToken();
if(!token && location.pathname !== '/index.html') {
    const searchParams = new URLSearchParams();
    searchParams.set('redirect', location.pathname);
    location = `index.html?${searchParams.toString()}`;
}

function fetchWithError(url, options) {
    if(token) {
        options = options || {};
        options.headers = options.headers || {};
        options.headers.Authorization = token;
    }

    return fetch(url, options)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                return response.json().then(json => {
                    throw json.error;
                });
            }
        });
}


export function getColor() {
    const url = `${COLOR_API}?rgb=rgb(255, 140, 140)&count=5&mode=monochrome`;
    return fetchWithError(url);
}

export function toScheme(data) {
    const colorArray = data.colors;
    const scheme = colorArray.map((color, idx) => {
        return {
            id: idx, 
            color: color.rgb.value
        };
    });
    return scheme;
}