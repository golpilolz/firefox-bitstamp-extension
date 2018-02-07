let cryptoselect = document.getElementById("crypto");

let lastupdateBox = document.getElementById("lastupdate");
let lastvalueBox = document.getElementById("lastvalue");

lastupdateBox.innerText = "fds";

function initPopup() {
    browser.storage.local.get('bt_currency').then(function (res) {
        cryptoselect.value = res.bt_currency;
    });
}

function updateDate(timestamp) {
    let date = new Date(timestamp*1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    lastupdateBox.innerText = formattedTime;
}

function updateValue(value) {
    lastvalueBox.innerText = value;
}

function updatePopup() {
    browser.storage.local.get('bt_timestamp').then(function(item){
        updateDate(item.bt_timestamp);
    });

    browser.storage.local.get('bt_last').then(function(item){
        updateValue(item.bt_last);
    });
}

initPopup();
updatePopup();

cryptoselect.addEventListener("change", function(){
    browser.storage.local.set({
        bt_currency: cryptoselect.value
    });
});