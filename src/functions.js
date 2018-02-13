/**
 * Format time from timestamp and return time in format hh:mm:ss
 *
 * @param {int} timestamp
 * @return {string}
 */
function formatTime(timestamp) {
    let date = new Date(timestamp*1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();

    return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}