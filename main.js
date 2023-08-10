
const input_selector = document.getElementById("input");
const output_selector = document.getElementById("output");
const input_value = document.getElementById("input_value");
const output_value = document.getElementById("output_value");

getCurrencies ();
//функция запрашивает данные из API записывает и встраивает в страницу
async function getCurrencies () {
    //Запрашиваем json файл из него записываем данные-обьекты 
    const response = await fetch ('https://www.cbr-xml-daily.ru/daily_json.js')
    const data = await response.json();
    const result = await data;
    //Чтобы получить массив названий обьектов используем Object.keys получается выдает вобще Object надо почитать еще будет что может делатб
    const length = Object.keys(result.Valute);
    //Получаем массив параметров обьктов по похожему принципу выше
    const value = (Object.values(result.Valute));

    console.log(input_value);
    
    //Записываем циклом данные в обьекты + создаем их на странице по какойто причине одним циклом не смог записать на вход и на выход данные странные получались надо разобраться

    for (var i = 0; i < length.length; i++) {
        var opt = document.createElement('option');
        opt.value = value[i].Value;
        opt.innerHTML = length[i];
        input_selector.appendChild(opt);
    }

    for (var i = 0; i < length.length; i++) {
        var opt = document.createElement('option');
        opt.value = value[i].Value;
        opt.innerHTML = length[i];
        output_selector.appendChild(opt);
    }
}

//Тут просто скрипт на разные действия который конвертирует валюту можно было не так громоздко но мне так наглядней было

input_value.oninput = function input_change () {
    output_value.value = ((input_value.value*input_selector.value/output_selector.value).toFixed(2));
}

output_value.oninput = function () {
    input_value.value = ((output_value.value*output_selector.value/input_selector.value).toFixed(2));
}

input_selector.addEventListener("change", (event) => {
    output_value.value = ((input_value.value*input_selector.value/output_selector.value).toFixed(2));
  });

output_selector.addEventListener("change", (event) => {
    output_value.value = ((input_value.value*input_selector.value/output_selector.value).toFixed(2));
  });

//по скриптам вроде все, грубо говоря их два основных