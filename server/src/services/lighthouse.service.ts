import getSignedAuth from "../utils/getSignedAuth"
import lighthouse from '@lighthouse-web3/sdk'
import { writeFileSync } from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const createFile = (data: any, path: string) => {
    try {
        const res = writeFileSync(path, JSON.stringify(data, null, 2))
        return res
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}



export const deployEncryptedFile = async (data: any) => {

    //=== Create a folder in data whenever a company is created

    const path: string = './src/data/data.json'
    const publicKey: string = "0xa60f738a60BCA515Ac529b7335EC7CB2eE3891d2";
    const signedMessage = await getSignedAuth(publicKey, process.env.LIGHTHOUSE_PRIVATE_KEY as string)
    createFile(data, path)
    try {

        const response = await lighthouse.uploadEncrypted(
            path,
            process.env.LIGHTHOUSE_API_KEY as string,
            publicKey,
            signedMessage
        );
        // Display response
        console.log(response);
        return response
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const decryptDeployed = async (cid: string) => {
    const publicKey: string = "0xa60f738a60BCA515Ac529b7335EC7CB2eE3891d2";
    const signedMessage = await getSignedAuth(publicKey, process.env.LIGHTHOUSE_PRIVATE_KEY as string)
    const fileEncryptionKey = await lighthouse.fetchEncryptionKey(cid, publicKey, signedMessage)
    const decrypted = await lighthouse.decryptFile(cid, fileEncryptionKey.data.key)
    return JSON.parse(Buffer.from(decrypted).toString())
}

export const getEmployeData = async (publicKey: string) => {
    const uploads = await lighthouse.getUploads(publicKey)
    const fileMetaData = uploads.data.uploads;
    fileMetaData.splice(fileMetaData.length - 2, 2);
    const promises = await uploads.data.uploads.map(async (encData: any) => {
        return await decryptDeployed(encData.cid)
    })
    return await Promise.all(promises)
}

// deployEncryptedFile({ success: true });
getEmployeData("0xa60f738a60BCA515Ac529b7335EC7CB2eE3891d2")
// decryptDeployed("QmZdjCLN4YXDrp7inFJnXusRPM2u2zC7Y3VYSrLA4WXewD")