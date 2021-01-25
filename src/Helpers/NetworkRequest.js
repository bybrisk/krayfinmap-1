import axios from 'axios'
const API = axios.create({
    baseURL:"http://localhost:5000",
    withCredentials:true,
    credentials:"include"
})

//add agent
export async function AddAgent(props){
    const {article,actions,closeModal,enqueueSnackbar} = props;
    try{
        const config = {headers:{"Content-Type": "application/json"}}
const body = article

        await API.post("/agents/addAgent",body,config);
        actions.setSubmitting(false);

        closeModal({makeRequest:true})
        enqueueSnackbar('Agent Added Succesfully',{
            variant: 'success',
            autoHideDuration: 2000,
        });

    }
    catch(e){
        
    }
  
}

//fetch agents
export async function fetchAgents(props){
const {bybId, setAgents} = props;
    try{
        const res = await API.get(`/agents/fetchAgents?bybid=${bybId}`);
console.log(res)
      res.data.result!==null && setAgents(res.data.result)
    }
    catch(err){
        
    }
    
}


//fetch agent details
export async function fetchAgentDetail(props){
const {id,setDetails} = props;
    try{
        const res = await API.get(`/agents/fetchAgentDetails?id=${id}`);
console.log(res)
      res.data.result!==null && setDetails(res.data)
  
    }
    catch(e){

    }
}


//modify agent
export async function modifyAgent(props){
    const {article,actions,setEditing,enqueueSnackbar} = props;
try{
    const config = {headers:{"Content-Type": "application/json"}}
    const body = article
    
         const res = await API.post("/agents/modifyAgent",body,config);
            actions.setSubmitting(false);
            enqueueSnackbar(res.data.message,{
                variant: 'success',
                autoHideDuration: 2000,
            });
            setEditing(false)

}
catch(e){

}
}

//delete agent
export async function deleteAgent(props){
    const {enqueueSnackbar,id,handleClose} = props;
    try{
        const res = await API.get(`/agents/delteAgent?id=${id}`);
console.log(res)
handleClose({makeRequest:true})
enqueueSnackbar('Agent Deleted Succesfully',{
    variant: 'success',
    autoHideDuration: 2000,
});

    }
    catch(e){

    }
}
//Agent Ends

//Delivery Starts

//add delivery
export async function AddDelivery(props){
    const {article,actions,closeModal,enqueueSnackbar} = props;
    try{
        const config = {headers:{"Content-Type": "application/json"}}
        const body = article
        
             await API.post("/delivery/addDelivery",body,config);
           actions && actions.setSubmitting(false);

           closeModal && closeModal({makeRequest:true})
           enqueueSnackbar && enqueueSnackbar('Delivery Added Succesfully',{
                 variant: 'success',
                 autoHideDuration: 2000,
             });
             return;
         }
    catch(e){
    
    }
    }

    //fetch deliveryDetails
export async function fetchDeliveryDetails(props){
const {id,setDetails} = props;
try{
    const res = await API.get(`/delivery/deliveryDetail?id=${id}`);
console.log(res)
  res.data!==null &&     setDetails(res.data);
}
catch(err){
    
}

  
}

//fetch deliveries
export async function fetchDeliveries(props){
    const {bybId,setDelivery} = props;
    try{
        const res = await API.get(`/delivery/fetchDeliveries?bybid=${bybId}`);
    console.log(res)
      res.data.hits.hits!==null &&     setDelivery(res.data.hits.hits);
    }
    catch(err){
        
    }
    }


//modify status
export async function modifyStatus(props){
    const {param,setDelivery} = props
    try{
        const config = {headers:{"Content-Type": "application/json"}}
        const body = JSON.stringify(param)
        
            await API.post("/delivery/modifyStatus",body,config);
             fetchDeliveries({bybId:param.BybID,setDelivery})
    
    }
    catch(e){
    
    }
    
}

//Delivery ends

//OnBoarding Starts

//create account
export async function CreateAccount(prop){
    const {article,dispatch,history,actions,enqueueSnackbar} = prop;
    console.log(article,"----------------article")
  
    try{
const config = {headers:{"Content-Type": "application/json"}}
const body = article
await API.post("/onboarding/createAccount",body,config);

  fetchAccountDetails({dispatch,history,actions,enqueueSnackbar})

    }
    catch(err){
console.log(err.response.data.message)
    }
  
}

//fetch account details
export async function fetchAccountDetails(props){
    const {dispatch,history,actions,enqueueSnackbar} = props;
    try{
        const res = await API.get("/onboarding/fetchAccountDetails");
        console.log(res)
        dispatch({
            type: "ID",
            payload: res.data.bybid
          });
        dispatch({type:'USER',payload:res.data.user});
        dispatch({ type: "LOG_IN", payload: true });
        enqueueSnackbar && (        enqueueSnackbar('Logined Succesfully',{
            variant: 'success',
            autoHideDuration: 2000,
        }))
        actions && actions.setSubmitting(false);
        history && history.push('/dashboard')
    
    }
    catch(err){
        history && history.push('/')
        
console.log(err.response)
    }
       
    }


//login account
export async function loginAccount(props){
    const {article,dispatch,history,actions,enqueueSnackbar} = props;
    try{
        const config = {headers:{"Content-Type": "application/json"}}
        const body = article
        
             const res = await API.post("/onboarding/loginAccount",body,config);
           if(res.data.bybid==="Denied"){
            enqueueSnackbar('Invalid Details',{
                variant: 'error',
                autoHideDuration: 2000,
            })
           }
           else{  console.log(res);
             dispatch({type:'ID',payload:res.data.bybid});
             dispatch({type:'USER',payload:res.data.user});
             dispatch({type:'LOG_IN',payload:true});
             actions.setSubmitting(false);

             enqueueSnackbar('Logined Succesfully',{
                 variant: 'success',
                 autoHideDuration: 2000,
             })
     
             history.push('/dashboard')
     } 
     actions.setSubmitting(false);

    }
    catch(e){
    
    }
    
    }


//update account
export async function UpdateAccount(prop){
    
    const {newDetails,enqueueSnackbar,close} = prop;
    try{
        const config = {headers:{"Content-Type": "application/json"}}
        const body = newDetails
            await API.post("/onboarding/updateAccount",body,config);
                enqueueSnackbar('Account Password Changed',{
                    variant: 'success',
                    autoHideDuration: 2000,
                });
                close();
    
    }
    catch(e){
    
    }
    
}

//is user name available
export async function IsUsernameAvailable(props){
    try{
        const res = await API.get(`/onboarding/usernameAvailable?username=${props.username}`);
console.log(res)
return res.data.IsPresent
}
    catch(err){
        
    }
}

//logout
export async function logout(props){

    try{
const res = await API.get(`/onboarding/logout`);
console.log(res)
props.history.push('/')
    }
    catch(err){
        
    }
}

//update password
export async function UpdatePassword(props){
    const {newDetails,enqueueSnackbar,close} = props;
    try{
        const config = {headers:{"Content-Type": "application/json"}}
        const body = newDetails
        
             await API.post("/onboarding/updatePassword",body,config);
             close();
             enqueueSnackbar('Account Updated Succesfully',{
                    variant: 'success',
                    autoHideDuration: 2000,
                });
    
    }
    catch(e){
    
    }
    
}

