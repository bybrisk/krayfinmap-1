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
        
         const response = await API.post("/delivery/addDelivery",body,config);
           actions && actions.setSubmitting(false);

           closeModal && closeModal({makeRequest:true})
           enqueueSnackbar && enqueueSnackbar('Delivery Added Succesfully',{
                 variant: 'success',
                 autoHideDuration: 2000,
             });
             return response;
         }
    catch(e){
    
    }
    }

export async function AddMultipleDeliveries(props){
    const {deliveryJson,cancel,closeModal,failedDeliveries,setFailedDeliveries,setProgress,enqueueSnackbar} = props;
    console.log("started try step",cancel)

    try {
    let i=0;
    console.log(cancel)
    console.log("entering WHhie loop try step",cancel)

    while(!cancel && i<deliveryJson.length){
        if(cancel){
            console.log("break from inside cancel",cancel)

break;
        }
     const response =  await AddDelivery({article:deliveryJson[i]})
     console.log(response)
     i+=1;
    }
    if(i!==deliveryJson.length-1){
        enqueueSnackbar('Delivery Adding interrupted',{
            variant: 'error',
            autoHideDuration: 2000,
        });
    }
    else{
        enqueueSnackbar('Delivery Added Succesfully',{
            variant: 'success',
            autoHideDuration: 2000,
        });
        closeModal();

    }
} catch (error) {
    
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

const createClusters = ({data}) =>{
    console.log(data)
let clusters = [];
for (let i = 0; i < data.ClusterIDArray.length; i++) {
  const colorForThisCluster =
  generateDarkColorHex();
  let singleCluster = [];
  data.AssignedDeliveryArray[i].hits.hits.map((item) => {
    singleCluster.push({
      clusterid: data.ClusterIDArray[i],
      customerName: item._source.CustomerName,
      color: colorForThisCluster,
      deliveryAgentID:item._source.deliveryAgentID,
      distanceObserved:item._source.distanceObserved,
      itemWeight:item._source.itemWeight,
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
    const {clusterID,setDelivery,enqueueSnackbar} = props;

    try {
        const res = await API.get(`/clusters/getdeliveries?clusterid=${clusterID}`);
        res.data.hits.hits!==null &&     setDelivery(res.data.hits.hits);
} catch (error) {
    enqueueSnackbar('Problem Fetching Deliveries',{
        variant: 'error',
        autoHideDuration: 2000,
    });
}
}

export async function fetchClusters(props){
    const {bybId, setClusters,enqueueSnackbar,setLoading} = props;
    console.log(setLoading)
        try{
    let clusters;
            const res = await API.get(`/clusters/allClusters?bybid=${bybId}`);
if(res.data.ClusterIDArray!==null && res.data!==undefined){
 clusters = createClusters({data:res.data});
console.log(clusters)
setClusters && setClusters(clusters)
setLoading && setLoading(false)
}else{
    setLoading && setLoading(false)

}
return clusters;
        }
        catch(err){
            console.log(err)
            setLoading && setLoading(false)

            enqueueSnackbar  && enqueueSnackbar('There are no Clusters Yet',{
                variant: 'info',
                autoHideDuration: 2000,
            });
        }
        
    }


export async function postCluster(props){
    const {clusterData,enqueueSnackbar,setSubmitting,bybId, setClusters} = props;

    try{
        const config = {headers:{"Content-Type": "application/json"}}
        const body = clusterData
        
             await API.post("/clusters/createCluster",body,config);
             console.log('great,this being stayed')
             setSubmitting(false)
             enqueueSnackbar('Cluster will be updated in 5 minutes',{
                    variant: 'success',
                    autoHideDuration: 2000,
                });
console.log("here starts")
    
    }
    catch(e){
        setSubmitting(false)

        enqueueSnackbar('Problem while making clusters',{
            variant: 'success',
            autoHideDuration: 2000,
        });

    }
    
}

export async function  genetateOverview(props){
    const {bybId, setClusters} = props;

const calculateAverageWeight = (array) =>{
    console.log(array,"ghghghghghghg")
    let averageWeight = 0;
    for(let i=0;i<array.length;i++){
averageWeight += array[i].itemWeight
}
return averageWeight
}

const calculateDistanceObserved = (array) =>{
    let distanceObserved = 0;
    for(let i=0;i<array.length;i++){
        distanceObserved += array[i].distanceObserved
}
return distanceObserved
}

const calculateTotals = (array) =>{
    let distanceObserved = 0;
    let averageWeight = 0;

    for(let i=0;i<array.length;i++){
        distanceObserved += array[i].distanceObserved
        averageWeight += array[i].itemWeight

}
return {distanceObserved, averageWeight}
}



    try {
    const clusterData = await fetchClusters({bybId})
    const clusterOverview = clusterData.map((item,index)=>{
        const {distanceObserved, averageWeight} = calculateTotals(item);
        return {
            clusterid:`Cluster ${index}`,
            deliveryAgentID:item[0].deliveryAgentID,
            totalDeliveries:item.length,
            distanceObserved:distanceObserved,
            averageWeight:averageWeight
        }
    })
console.log(clusterOverview,"===----===----===----")
        setClusters(clusterOverview)    
} catch (error) {
    console.log(error)
}

}

