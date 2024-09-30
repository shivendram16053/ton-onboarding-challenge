import {Address, TonClient} from "ton"
import {getHttpEndpoint} from "@orbs-network/ton-access";
import {BN} from 'bn.js'



async function main () {

  const wallet = Address.parse('0QCl3x5DeoZge0MnVr7c7eMs2uUTb1wI-RRyAzAuX0C4W4MV');
  const collection = Address.parse('EQDk8N7xM5D669LC2YACrseBJtDyFqwtSPCNhRWXU7kjEptX');

  const endpoint = await getHttpEndpoint({
    network: "testnet",
  });

  // initialize ton library
  const client = new TonClient({ endpoint });

  const miningData = await client.callGetMethod(collection, 'get_mining_data')

  const parseStackNum = (sn: any) => new BN(sn[1].substring(2), 'hex');

  const complexity = parseStackNum(miningData.stack[0]);
  const last_success = parseStackNum(miningData.stack[1]);
  const seed = parseStackNum(miningData.stack[2]);
  const target_delta = parseStackNum(miningData.stack[3]);
  const min_cpl = parseStackNum(miningData.stack[4]);
  const max_cpl = parseStackNum(miningData.stack[5]);

  console.log('complexity', complexity);
  console.log('last_success', last_success.toString());
  console.log('seed', seed);
  console.log('target_delta', target_delta.toString());
  console.log('min_cpl', min_cpl.toString());
  console.log('max_cpl', max_cpl.toString());
}

main()