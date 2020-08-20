const API_KEY = 'AIzaSyCZSZ1CnXUy4mntq5bTGzlhHw_1GgMlWH8';
const URL = 'https://www.googleapis.com/webfonts/v1/webfonts';

function getFontList() {
    let url = URL + '?key=' + API_KEY;
    return fetch(url).then((response) => {
        return response.json();
    });
}

async function generateFontSelect() {
    let fontList = await getFontList();

    for (let i = 0; i < fontList.items.length; i++) {
        let fontDetails = fontList.items[i];
        let newOption = document.createElement('option');
        let selectDiv = document.querySelector('select');

        newOption.value = fontDetails.family.replaceAll(' ', '+');
        newOption.appendChild(document.createTextNode(fontDetails.family));
        selectDiv.appendChild(newOption);
    }
}

function updateStyle(font) {
    let paraDiv = document.querySelector('p');
    paraDiv.style.fontFamily = font.replaceAll('+', " ");
}

function updateFont() {
    let selectDiv = document.querySelector('select');
    let fontValue = selectDiv.value;
    let fontLinkDiv = document.querySelector('#font-link');
    fontLinkDiv.setAttribute('href', 'https://fonts.googleapis.com/css2?family=' + fontValue);
    updateStyle(selectDiv.value);
}

generateFontSelect();