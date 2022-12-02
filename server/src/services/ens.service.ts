import getEns from "../utils/ensProvider"


export const createCompany = async (name: string) => {
    try {
        const ens = await getEns();
        console.log("Bleh", ens)
        //await ens.name(process.env.COMPANY_ENS_NAME).createSubdomain("shf")
    } catch (error) {
        throw error
    }
}

createCompany("ayush")