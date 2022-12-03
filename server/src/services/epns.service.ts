import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import * as dotenv from "dotenv";
dotenv.config();


const Pkey = `0x${process.env.EPNS_PRIVATE_KEY}`;
const signer = new ethers.Wallet(Pkey);


export const sendNotification = async ({ title, titleBody, msgTitle, msgBody }: { title: string, titleBody: string, msgTitle: string, msgBody: string }, recipients: string) => {
    console.log(recipients, 'array from the method')

    try {
        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 3,
            identityType: 2,
            notification: {
                title: title,
                body: titleBody
            },
            payload: {
                title: msgTitle,
                body: msgBody,
                cta: '',
                img: ''
            },
            recipients,
            channel: 'eip155:80001:0xCc2e5b8309136739a77E0919a08E796C29d0ac01',
            env: 'staging'
        });

        if (apiResponse?.status === 204) {
            console.log('sucess')
        }
        // apiResponse?.status === 204, if sent successfully!
    } catch (err) {
        console.error('Error: ', err);
    }
}

const arr = ["eip155:80001:0xa60f738a60BCA515Ac529b7335EC7CB2eE3891d2", "eip155:80001:0x1Cb30cb181D7854F91c2410BD037E6F42130e860"]

arr.forEach(arr => {
    sendNotification({
        title: "Msg",
        titleBody: "YMeh",
        msgTitle: "Bleh",
        msgBody: "Hey Yash!"
    }, arr);
})