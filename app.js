// In second
const REFRESH_TIME = 30;

let lastvalue = 0;

function refresh(first = false){
    const req = new XMLHttpRequest();

    if(first){
        getLastValue();
    }

    req.onreadystatechange = function(event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                let obj = JSON.parse(this.responseText);
                saveInStorage(obj);

                let val = parseFloat(obj.last);

                if(val >= 100){
                    val = Math.floor(val) + "";
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

function getLastValue() {
    let gettingItem = browser.storage.local.get('bt_last');
    gettingItem.then((res) => {
        browser.browserAction.setBadgeText({
            text: res.bt_last,
        });

        lastvalue = res.bt_last;
    });
}


browser.browserAction.setBadgeBackgroundColor({color: "grey"});

refresh(true);

window.setInterval(function(){
    refresh();
}, REFRESH_TIME * 1000);