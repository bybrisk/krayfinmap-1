import axios from 'axios'
const domain = 'https://bybriskbackend.herokuapp.com'
// https://bybriskbackend.herokuapp.com
export async function fetchAgentDetail(props){
	const response = await axios ({
        url: `${domain}/agents/fetchAgentDetails?id=${props.id}`,

        method: "GET"
    })
        props.setDetails(response.data);
    
}


export async function fetchDeliveryDetails(props){
const {bybId,setDetails} = props;
    const response = await axios ({
        url: `${domain}/delivery/deliveryDetail?id=${bybId}`,

        method: "GET"
    })
    setDetails(response.data);
console.log(response)    
}

export async function fetchAgents(props){
    const response = await axios ({
        url: `${domain}/agents/fetchAgents?bybid=${props.bybId}`,
        method: "GET"
    })
    if(response.data.result!==null){
        props.setAgents(response.data.result);
    }
}

export async function modifyAgent(param){
    axios.post(`${domain}/agents/modifyAgent`,{param})
    .then(response=>{
        return response;
    });
}

export async function deleteAgent(id){
    const response = await axios ({
        url: `${domain}/agents/delteAgent?id=${id}`,
        method: "GET"
    })
    return response;

}

export async function AddAgent(props){
    const response = await axios ({
        url: `${domain}/agents/addAgent`,
        method: "POST",
params:props.article

    })
  
}

export async function CreateAccount(param){
    axios.post(`${domain}/onboarding/createAccount`,{param})
    .then(response=>{
        return response;
    });
}

export async function UpdateAccount(param){
    axios.post(`${domain}/onboarding/updateAccount`,{param})
    .then(response=>{
        return response;
    });
}

export async function UpdatePassword(param){
    axios.post(`${domain}/onboarding/updatePassword`,{param})
    .then(response=>{
        return response;
    });
}

// export async function UpdatePassword(param){
//     axios.post(`${domain}/onboarding/updatePassword`,{param})
//     .then(response=>{
//         console.log(response);
//         return response;
//     });
// }

export async function AddDelivery(param){
    axios.post(`${domain}/delivery/addDelivery`,{param})
    .then(response=>{
        return response;
    });
}