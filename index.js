
const TronWeb = require('tronweb')
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { "TRON-PRO-API-KEY": '0de2a20b-8ac7-4092-9ff4-75d9f9227056' },
    privateKey: 'c4cc526ccd122b6f044f82fa87f1349b3380e80b04535ea17fcfde97a4e1eb2f'
})


const contractAbi = {
  cyadex: [
    "function getprice() public view returns(uint256)",
    "function balance() public view returns(uint256)",
    "function buy() payable public",
    "function sell(uint256 num) public"
  ],
};

const contractAddress = {
  cyadexAddr: "TK7pN4Nrnttjirrjdp6vTWVi2Tp3pw6ksL"
};

const topDataSync = async () => {
  // BNB Price
  const responseBinanceTicker = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=TRXUSDT');
  const bnbPrice = parseFloat(responseBinanceTicker.data.price);
  document.getElementById("bPrice").innerHTML = bnbPrice.toFixed(6);
  document.getElementById("cPrice").innerHTML = bnbPrice.toFixed(6);

 

  // 트론웹 초기화


  const cyadexContract = await tronWeb.contract().at(contractAddress.cyadexAddr);
  const cyadexPrice = await cyadexContract.getprice();

  document.getElementById("cyaPrice2").innerHTML = (1000000000000 / cyadexPrice).toFixed(6); // 1cya = ?trx
};
 

(async () => {
  topDataSync();

  let userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
        chainId: "0x1",
        rpcUrls: ["https://api.trongrid.io/"],
        chainName: "Tron Mainnet",
        nativeCurrency: {
            name: "Tron",
            symbol: "TRX",
            decimals: 18
        },
        blockExplorerUrls: ["https://api.trongrid.io/"]
    }]
  });
  await userProvider.send("eth_requestAccounts", []);
  
  let cyadexContract = new ethers.Contract(contractAddress.cyadexAddr, contractAbi.cyadex, userProvider);
  let selectElement = document.getElementById('bnbInput');
  let selectElement2 = document.getElementById('cyaInput');
  
  selectElement.addEventListener('change', async (event) => {
    if (event.target.value < 0.001) {
      alert("now enough value");
    } else {
      document.getElementById('bnbOutput').value=event.target.value*parseFloat(await cyadexContract.getprice())/1000
    }
  });
  selectElement2.addEventListener('change', async (event) => {
    document.getElementById('cyaOutput').value=event.target.value/parseFloat(await cyadexContract.getprice())*980
  })
  })();