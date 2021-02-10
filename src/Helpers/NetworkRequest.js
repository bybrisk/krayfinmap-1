import axios from 'axios'
const API = axios.create({
    baseURL:"https://bybriskbackend.herokuapp.com",
    withCredentials:true,
    credentials:"include"
})

// https://bybriskbackend.herokuapp.com
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
  res.data!==null &&     setDetails(res.data);
}
catch(err){
    
}

  
}

//fetch deliveries
export async function fetchDeliveries(props){
    const {bybID,setDelivery} = props;
    try{
        const res = await API.get(`/delivery/fetchDeliveries?bybid=${bybID}`);
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
             fetchDeliveries({bybID:param.BybID,setDelivery})
    
    }
    catch(e){
    
    }
    
}

//Delivery ends

//OnBoarding Starts

//create account
export async function CreateAccount(prop){
    const {article,dispatch,history,actions,enqueueSnackbar} = prop;
  
    try{
const config = {headers:{"Content-Type": "application/json"}}
const body = article
const res = await API.post("/onboarding/createAccount",body,config);
const bybID = res.data.bybID
dispatch({
    type: "ID",
    payload: res.data.bybID
  });

  fetchAccountDetails({dispatch,history,actions,enqueueSnackbar,bybID})

    }
    catch(err){
    }
  
}

//fetch account details
export async function fetchAccountDetails(props){
    const {dispatch,history,actions,enqueueSnackbar,bybID} = props;

    try{
        const res = await API.get(`/onboarding/fetchAccountDetails?bybId=${bybID}`);
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
           else{ dispatch({type:'ID',payload:res.data.bybID});
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
        enqueueSnackbar("Password or Email is Invalid",{
            variant: 'error',
            autoHideDuration: 2000,
        })
        actions.setSubmitting(false);

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
return res.data.IsPresent
}
    catch(err){
        
    }
}

//logout
export async function logout(props){

    try{
const res = await API.get(`/onboarding/logout`);
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

//clusters
function generateDarkColorHex() {
    let color = "#";
    for (let i = 0; i < 3; i++)
      color += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2);
    return color;
  }

const createClusters = (data) =>{
let clusters = [];
for (let i = 0; i < data[0].ClusterIDArray.length; i++) {
  const colorForThisCluster =
  generateDarkColorHex();
  let singleCluster = [];
  data[0].AssignedDeliveryArray[i].hits.hits.map((item) => {
    singleCluster.push({
      clusterid: data[0].ClusterIDArray[i],
      customerName: item._source.CustomerName,
      color: colorForThisCluster,
      geometry: {
        latitude: item._source.latitude,
        longitude: item._source.longitude
      }
    });
  });
  clusters.push(singleCluster);
}
return clusters;
}

export async function fetchClusterDeliveries(props){
    const {clusterID,setDeliveries,enqueueSnackbar} = props;

    try {
        const res = await API.get(`/clusters/allClusters/?clusterid=${clusterID}`);
        if(res.data.hits.hits!==null || res.data.hits.hits!==undefined){
        setDeliveries(res.data.hits.hits);
    }
} catch (error) {
    enqueueSnackbar('Problem Fetching Data',{
        variant: 'error',
        autoHideDuration: 2000,
    });
}
}

export async function fetchClusters(props){
    const {bybId, setClusters,enqueueSnackbar} = props;
        try{
            const res = await API.get(`/clusters/allClusters/?bybid=${bybId}`);
if(res.data!==null || res.data!==undefined){
const clusters = createClusters();
setClusters(clusters)
}
        }
        catch(err){
            console.log(err)
            enqueueSnackbar('There are no Clusters Yet',{
                variant: 'info',
                autoHideDuration: 2000,
            });
        }
        
    }

