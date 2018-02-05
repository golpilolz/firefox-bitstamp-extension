// In second
const REFRESH_TIME = 30;

let lastvalue = 0;


function refresh(){
    const req = new XMLHttpRequest();

    req.onreadystatechange = function(event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                let obj = JSON.parse(this.responseText);
                saveInStorage(obj);

                let val = obj.last;

                if(val >= 100){
                    val = Math.floor(parseFloat(val)) + "";
                }

                browser.browserAction.setBadgeText({
                    text: val
                });

                if(lastvalue <= obj.last) {
                    browser.browserAction.setBadgeBackgroundColor({color: "green"});
                } else {
                    browser.browserAction.setBadgeBackgroundColor({color: "red"});
                }
            }
        }
    };

    //req.open('GET', 'https://www.bitstamp.net/api/v2/ticker/xrpeur/', true);
    req.open('GET', 'https://www.bitstamp.net/api/v2/ticker/etheur/', true);
    req.send(null);
}

function saveInStorage(obj) {
    browser.storage.local.set({
        bt_last: obj.last,
        bt_timestamp: obj.timestamp
    });
}

function updateTitle(cryptoName, timestamp, value){
    let date = new Date(timestamp*1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    browser.browserAction.setTitle({
        title: 'Etherum à ' + formattedTime + " : " + value + " €"
    });
}

/*
Log the storage area that changed,
then for each item changed,
log its old value and its new value.
*/
function logStorageChange(changes, area) {
    lastvalue = changes["bt_last"].newValue;
    let crypto = "Etherum";
    updateTitle(crypto, changes["bt_timestamp"].newValue, changes["bt_last"].newValue);
}

browser.browserAction.setTitle({
    title: 'Etherum'
});
browser.browserAction.setBadgeBackgroundColor({color: "grey"});

refresh();

browser.storage.onChanged.addListener(logStorageChange);

window.setInterval(function(){
    refresh();
}, REFRESH_TIME * 1000);