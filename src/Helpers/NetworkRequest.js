import axios from 'axios'
import { setLoading } from '../constants/Redux'
const domain = 'https://bybriskbackend.herokuapp.com'
// https://bybriskbackend.herokuapp.com

//Agent Start
export async function AddAgent(props){
    const {article,actions,closeModal,enqueueSnackbar} = props;
axios.post (`${domain}/agents/addAgent`,{article}).then(response=>{
    actions.setSubmitting(false);

        closeModal({makeRequest:true})
        enqueueSnackbar('Agent Added Succesfully',{
            variant: 'success',
            autoHideDuration: 2000,
        });

    })
  
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

export async function fetchAgentDetail(props){
	const response = await axios ({
        url: `${domain}/agents/fetchAgentDetails?id=${props.id}`,

        method: "GET"
    })
        props.setDetails(response.data);
    
}

export async function modifyAgent(props){
    const {article,actions,setEditing,enqueueSnackbar} = props;
    console.log("called")

    axios.post(`${domain}/agents/modifyAgent`,{article})
    .then(response=>{
        actions.setSubmitting(false);
        setEditing(false)
        enqueueSnackbar(response.data.message,{
            variant: 'success',
            autoHideDuration: 2000,
        });
    });
}

export async function deleteAgent(props){
    const {enqueueSnackbar,id,handleClose} = props;
    await axios ({
        url: `${domain}/agents/delteAgent?id=${id}`,
        method: "GET"
    }).then(response=>{
        handleClose({makeRequest:true})
        enqueueSnackbar('Agent Deleted Succesfully',{
            variant: 'success',
            autoHideDuration: 2000,
        });
    
    })
    

}
//Agent Ends

//Delivery Starts
export async function AddDelivery(props){
    const {article,actions,closeModal,enqueueSnackbar} = props;

    axios.post(`${domain}/delivery/addDelivery`,{article})
    .then(response=>{
        actions.setSubmitting(false);

        closeModal({makeRequest:true})
        enqueueSnackbar('Delivery Added Succesfully',{
            variant: 'success',
            autoHideDuration: 2000,
        });
    });
}

export async function fetchDeliveryDetails(props){
const {id,setDetails} = props;
    const response = await axios ({
        url: `${domain}/delivery/deliveryDetail?id=${id}`,

        method: "GET"
    })
    setDetails(response.data);
console.log(response)    
}

export async function fetchDeliveries(props){
    const response = await axios ({
        url: `${domain}/delivery/fetchDeliveries?bybid=${props.bybId}`,
        method: "GET"
    })
    if(response.data.result!==null){
        console.log(response.data.hits.hits)
        props.setDelivery(response.data.hits.hits);
    }
}

export async function modifyStatus(props){
    const {param,setDelivery} = props
    console.log(props,"-----------------props")
    axios.post(`${domain}/delivery/modifyStatus`,{param:JSON.stringify(param)})
    .then(response=>{

fetchDeliveries({bybId:param.BybID,setDelivery})
    });
    
}

//Delivery ends

//OnBoarding Starts
export async function CreateAccount(prop){
    const {article,dispatch,history,actions,enqueueSnackbar} = prop;
    axios.post(`${domain}/onboarding/createAccount`,{article})
    .then(response=>{
        localStorage.setItem("user", JSON.stringify(article));
        localStorage.setItem("bybId", JSON.stringify(response.data.bybID));
        dispatch({
            type: "LOG_IN",
            payload: true
          });
          dispatch({
            type: "ID",
            payload: response.data.bybID
          });
          dispatch({
            type: "USER",
            payload: article
          });
          actions.setSubmitting(false);
          history.push("/dashboard");
            
        enqueueSnackbar('Account Created Succesfully',{
            variant: 'success',
            autoHideDuration: 2000,
        });

        return response;
    });
}
export async function fetchAccountDetails(props){
    const {bybId,dispatch} = props;
        const response = await axios ({
            url: `${domain}/onboarding/fetchAccountDetails/?id=${bybId}`,
    
            method: "GET"
        })
        dispatch({type:'USER',payload:response.data});
    console.log(response)    
    return;
    }

export async function UpdateAccount(prop){
    const {newDetails,enqueueSnackbar,close} = prop;
    axios.post(`${domain}/onboarding/updateAccount`,{newDetails})
    .then(response=>{
        close();
        enqueueSnackbar('Account Password Changed',{
            variant: 'success',
            autoHideDuration: 2000,
        });
return;
    });
}

export async function UpdatePassword(props){
    const {newDetails,enqueueSnackbar,close} = props;
    axios.post(`${domain}/onboarding/updatePassword`,{newDetails})
    .then(response=>{
        close();
        enqueueSnackbar('Account Updated Succesfully',{
            variant: 'success',
            autoHideDuration: 2000,
        });
return;
    });
}
//OnBoarding Ends

// export async function UpdatePassword(param){
//     axios.post(`${domain}/onboarding/updatePassword`,{param})
//     .then(response=>{
//         console.log(response);
//         return response;
//     });
// }

