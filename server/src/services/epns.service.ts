import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import * as dotenv from "dotenv";
dotenv.config();


const Pkey = `0x${process.env.EPNS_PRIVATE_KEY}`;
const signer = new ethers.Wallet(Pkey);


export const sendNotification = async ({ msgTitle, msgBody }: { msgTitle: string, msgBody: string }, recipients: string) => {
    console.log(recipients, 'array from the method')

    try {
        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 3,
            identityType: 2,
            notification: {
                title: "Hey! you got a notification!",
                body: ""
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
