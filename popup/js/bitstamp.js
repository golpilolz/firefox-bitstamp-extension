let cryptoselect = document.getElementById("crypto");

let lastupdateBox = document.getElementById("lastupdate");
let lastvalueBox = document.getElementById("lastvalue");
let refreshspeed = document.getElementById("refreshspeed");
let refreshvalue = document.getElementById("refreshvalue");

lastupdateBox.innerText = "";

function initPopup() {
    browser.storage.local.get('bt_currency').then(function (res) {
        console.log(res.bt_currency);

        cryptoselect.value = res.bt_currency;
    });
}

function updateDate(timestamp) {
    lastupdateBox.innerText = formatDate(timestamp);
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
};