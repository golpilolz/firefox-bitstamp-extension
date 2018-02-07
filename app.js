// In second
const REFRESH_TIME = 30;
const DEFAULT_CURRENCY = 'ethusd';

let lastvalue = 0;
let urlbt = 'https://www.bitstamp.net/api/v2/ticker/';
let currentCurrency;

let intervalRefresh;

/**
 * Init all value and start interval
 */
function init() {
    browser.browserAction.setTitle({
        title: 'Ethereum'
    });
    browser.browserAction.setBadgeBackgroundColor({color: "grey"});

    if (typeof currentCurrency === 'undefined') {
        currentCurrency = DEFAULT_CURRENCY + "/";
    }

    refresh();

    browser.storage.onChanged.addListener(logStorageChange);

    intervalRefresh = setInterval(function () {
        refresh();
    }, REFRESH_TIME * 1000);
}

/**
 * Refresh value in badge and localstorage
 */
function refresh() {
    const req = new XMLHttpRequest();

    req.onreadystatechange = function (event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                let obj = JSON.parse(this.responseText);
                saveInStorage(obj);

                let val = obj.last;

                if (val >= 100) {
                    val = Math.floor(parseFloat(val)) + "";
                }

                browser.browserAction.setBadgeText({
                    text: val
                });

                if (lastvalue <= obj.last) {
                    browser.browserAction.setBadgeBackgroundColor({color: "green"});
                } else {
                    browser.browserAction.setBadgeBackgroundColor({color: "red"});
                }
            }
        }
    };

    console.log(urlbt + currentCurrency);

    req.open('GET', urlbt + currentCurrency, true);
    req.send(null);
}

/**
 * @param obj
 */
function saveInStorage(obj) {
    browser.storage.local.set({
        bt_last: obj.last,
        bt_timestamp: obj.timestamp
    });
}

/**
 * @param cryptoName
 * @param timestamp
 * @param value
 */
function updateTitle(cryptoName, timestamp, value) {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    browser.browserAction.setTitle({
        title: 'Ethereum à ' + formattedTime + " : " + value + " €"
    });
}

/**
 * Log the storage area that changed,
 * then for each item changed,
 * log its old value and its new value.
 *
 * @param changes
 * @param area
*/
function logStorageChange(changes, area) {
    if (typeof changes['bt_last'] !== 'undefined') {
        lastvalue = changes["bt_last"].newValue;
        let crypto = "Ethereum";
        updateTitle(crypto, changes["bt_timestamp"].newValue, changes["bt_last"].newValue);
    }

    if (typeof changes['bt_currency'] !== 'undefined') {
        currentCurrency = changes['bt_currency'].newValue + "/";
        refresh();
    }
}

init();