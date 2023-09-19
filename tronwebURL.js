

export const tronWebConfig = {
  networks: {
    development: {
// For trontools/quickstart docker image
      privateKey: 'c4cc526ccd122b6f044f82fa87f1349b3380e80b04535ea17fcfde97a4e1eb2f',
      consume_user_resource_percent: 30,
      fee_limit: 100000000,
      fullNode: "http://127.0.0.1:8090",
      solidityNode: "http://127.0.0.1:8091",
      eventServer: "http://127.0.0.1:8092",
      network_id: "*"
    },
    shasta: {
      privateKey: 'c4cc526ccd122b6f044f82fa87f1349b3380e80b04535ea17fcfde97a4e1eb2f',
      consume_user_resource_percent: 30,
      fee_limit: 100000000,
      fullHost: "https://api.shasta.trongrid.io",
      network_id: "*"
    },
    mainnet: {

      privateKey: 'c4cc526ccd122b6f044f82fa87f1349b3380e80b04535ea17fcfde97a4e1eb2f',
      consume_user_resource_percent: 30,
      fee_limit: 100000000,
      fullHost: "https://api.trongrid.io",
      network_id: "*"
    }
  }
};


const TronWeb = require('tronweb')
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { "TRON-PRO-API-KEY": '0de2a20b-8ac7-4092-9ff4-75d9f9227056' },
    privateKey: 'c4cc526ccd122b6f044f82fa87f1349b3380e80b04535ea17fcfde97a4e1eb2f'
})

