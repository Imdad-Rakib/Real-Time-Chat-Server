import { ActiveClients } from "../models/activeClients.mjs"
async function addClient(email, connectionId){    
    
    try{
        await ActiveClients.deleteMany(
            {email},
        )
        let newClient = new ActiveClients({
            email, 
            connectionId
        })
        await newClient.save();
    }
    catch(err){
        console.log(err)
    }
}
async function removeClient(connectionId){    
    
    try{
        await ActiveClients.deleteMany({
            connectionId
        })
    }
    catch(err){
        console.log(err)
    }
}


export {addClient, removeClient}