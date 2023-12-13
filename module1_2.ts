import { Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram, PublicKey, sendAndConfirmTransaction, Connection, clusterApiUrl, TransactionInstruction } from '@solana/web3.js';
import * as fs from 'fs';

async function main() {
    const connection = new Connection(clusterApiUrl('devnet'));
    const secret = JSON.parse(fs.readFileSync('ephkey.json').toString()) as number[]
    const secretKey = Uint8Array.from(secret)
    const ownerKeypair = Keypair.fromSecretKey(secretKey)

    const publicKey = ownerKeypair.publicKey;

    console.log(publicKey.toBase58())
    console.log(ownerKeypair.secretKey.length)

    const transaction = new Transaction()

    const recipient = new PublicKey("32aACc6juo8ge4JWqsojhqWE1Q512UJggfELdeed2Bjb")

    const lamports = BigInt(LAMPORTS_PER_SOL * 0.1)
    const instructionData: Buffer = Buffer.alloc(4 + 8)
    instructionData.writeUint32LE(2, 0)
    instructionData.writeBigUint64LE(lamports, 4)

    const manualInstruction = new TransactionInstruction({
        keys: [
            {
                pubkey: ownerKeypair.publicKey,
                isSigner: true,
                isWritable: true
            },
            {
                pubkey: recipient,
                isSigner: false,
                isWritable: true
            }
        ],
        programId: SystemProgram.programId,
        data: instructionData
    })

    transaction.add(manualInstruction)

    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [ownerKeypair]
    )

    console.log(signature)
}

main()



// const airdropSignature = await connection.requestAirdrop(ownerKeypair.publicKey, 1 * LAMPORTS_PER_SOL)

    // const sendSolInstruction = SystemProgram.transfer({
    //     fromPubkey: ownerKeypair.publicKey,
    //     toPubkey: recipient,
    //     lamports: LAMPORTS_PER_SOL * 0.1
    // })
