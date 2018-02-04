// In second
const REFRESH_TIME = 30;

const lastupdateBox = document.getElementById("lastupdate");

function updateContent() {
    /*browser.storage.local.get('timestamp').then((storedInfo) => {
        lastupdateBox.innerHTML = storedInfo['timestamp'];
    });*/

    lastupdateBox.value = "Test";
}

updateContent();