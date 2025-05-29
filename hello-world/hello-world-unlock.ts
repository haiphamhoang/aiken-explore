import {
    deserializeAddress,
    mConStr0,
    stringToHex,
} from "@meshsdk/core";
import { getScript, getTxBuilder, getUtxoByTxHash, wallet } from "./common";

async function main() {
    // get utxo, collateral and address from wallet
    const utxos = await wallet.getUtxos();
    const walletAddress = (await wallet.getUsedAddresses())[0];
    const collateral = (await wallet.getCollateral())[0];

    const { scriptCbor } = getScript();

    // hash of the public key of the wallet, to be used in the datum
    const signerHash = deserializeAddress(walletAddress).pubKeyHash;
    // redeemer value to unlock the funds
    const message = "Hello, World!";

    // get the utxo from the script address of the locked funds
    const txHashFromDesposit = process.argv[2];
    const scriptUtxo = await getUtxoByTxHash(txHashFromDesposit);
}

main();