/**
 *
 * @returns {Array}
 */
function getCryptos() {
    let cryptos = [];
    cryptos['etheur'] = [];
    cryptos['etheur']['name'] = 'ETH / EUR';
    cryptos['etheur']['icon'] = 'icons/eth-32.png';
    cryptos['xrpeur'] = [];
    cryptos['xrpeur']['name'] = 'XRP / EUR';
    cryptos['xrpeur']['icon'] = 'icons/xrp-32.png';

    return cryptos;
}