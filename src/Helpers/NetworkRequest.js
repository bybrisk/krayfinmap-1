import axios from 'axios'
const domain = 'https://developers.bybrisk.com'

export async function fetchAgentDetail(props){
	const response = await axios ({
        url: `${domain}/agents/one/${props.id.id}`,
        method: "GET"
    })

    if(response.data!==null){
var data = response.data;
        data.Locality = data.Address.split(' & ')[0]
data.City = data.Address.split(' & ')[2];
data.Pin = data.Address.split(' & ')[3];
data.Landmark = data.Address.split(' & ')[1];
data.bybId = props.id.id;
        props.setDetails(data);
    }
}

export async function fetchAgents(props){
    const response = await axios ({
        url: `${domain}/agents/all/${props.bybId}`,
        method: "GET"
    })
    console.log(response);
    if(response.data.result!==null){
        props.setAgents(response.data.result);
    }
}

export async function modifyAgent(param){
    axios.post(`${domain}/agents/update`,{param})
    .then(response=>{
        console.log(response);
        return response;
    });
}

export async function deleteAgent(id){
    const response = await axios ({
        url: `${domain}/agents/delete/${id.id}`,
        method: "GET"
    })
    return response;

}

export async function AddAgent(props){
    const response = await axios ({
        url: `${domain}/agents/create`,
        method: "POST",
params:props.article

    })
    console.log(response)
  
}

export async function CreateAccount(param){
    axios.post(`${domain}/account`,{param})
    .then(response=>{
        console.log(response);
        return response;
    });
}

export async function UpdateAccount(param){
    axios.post(`${domain}/accountUpdate`,{param})
    .then(response=>{
        console.log(response);
        return response;
    });
}

export async function UpdatePassword(param){
    axios.post(`${domain}/accountUpdate/password`,{param})
    .then(response=>{
        console.log(response);
        return response;
    });
}