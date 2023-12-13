import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
    const connection = new Connection(clusterApiUrl('devnet'));
    return connection.getBalance(address);
}

const publicKey = new PublicKey('K7DtubNk1beyBZPesVUC8qkZnXNSCDfeWBLus4VNGWX')

getBalanceUsingWeb3(publicKey).then(balance => {
    console.log(balance / LAMPORTS_PER_SOL + " SOL")
})
