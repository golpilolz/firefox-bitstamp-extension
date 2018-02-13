let cryptoselect = document.getElementById("crypto");

let lastupdateBox = document.getElementById("lastupdate");
let lastvalueBox = document.getElementById("lastvalue");
let refreshspeed = document.getElementById("refreshspeed");
let refreshvalue = document.getElementById("refreshvalue");

let currentCurrencyName = document.getElementById("current-currency-name");

lastupdateBox.innerText = "";

function initPopup() {
    browser.storage.local.get('bt_currency').then(function (res) {
        cryptoselect.value = res.bt_currency;
    });
    browser.storage.onChanged.addListener(updatePopup);
}

function updateDate(timestamp) {
    lastupdateBox.innerText = formatTime(timestamp);
}

function updateValue(value) {
    lastvalueBox.innerText = value;
}

function updateRefreshTime(time) {
    refreshspeed.value = time;
    refreshvalue.innerHTML = time;
}

function updatePopup() {
    browser.storage.local.get('bt_timestamp').then(function(item){
        updateDate(item.bt_timestamp);
    });

    browser.storage.local.get('bt_last').then(function(item){
        updateValue(item.bt_last);
    });

    browser.storage.local.get('bt_refresh_time').then(function(item){
        updateRefreshTime(item.bt_refresh_time);
    });

    browser.storage.local.get('current_currency_name').then(function(item){
        currentCurrencyName.innerHTML = item.current_currency_name;
    });
}

initPopup();
updatePopup();

/**
 *
 * @param timestamp
 * @return {string}
 */
function formatDate(timestamp) {
    let date = new Date(timestamp*1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

cryptoselect.addEventListener("change", function(){
    browser.storage.local.set({
        bt_currency: cryptoselect.value
    });
});

refreshspeed.oninput = function() {
    refreshvalue.innerHTML = this.value;
    browser.storage.local.set({
        bt_refresh_time: this.value
    });
};