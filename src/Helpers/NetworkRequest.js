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
const {bybId, setAgents,setLoading} = props;
    try{
        setLoading && setLoading(true)
        const res = await API.get(`/agents/fetchAgents?bybid=${bybId}`);
      res.data.result!==null && setAgents(res.data.result);
      setLoading && setLoading(false);

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
        
         const response = API.post("/delivery/addDelivery",body,config);
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

    export async function AddDeliveryWithGeoCode(props){
        const {article,source,responseArray} = props;
        try{
            const config = {headers:{"Content-Type": "application/json"},cancelToken:source.token}
            const body = article
            
             const response = API.post("/delivery/addDeliveryWithGeocode",body,config);
            //  console.log(response,"--g--g-g-g-g-g--g-g-g-");
responseArray.push(response);
return;
            }
        catch(e){
        
        }
        }

export async function AddMultipleDeliveries(props){
    const {deliveryJson,cancel,closeModal,failedDeliveries,setFailedDeliveries,setProgress,enqueueSnackbar} = props;
    console.log("started try step",cancel)

    try {
    let i=0;
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
    const {bybID,setDelivery,setLoading} = props;
    try{
       setLoading && setLoading(true)
        const res = await API.get(`/delivery/fetchDeliveries?bybid=${bybID}`);
        console.log(res,"--f-f-f-f-f-")
      res.data.hits.hits!==null &&     setDelivery(res.data.hits.hits);
      setLoading && setLoading(false)
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
                enqueueSnackbar('Account Updated Succesfully',{
                    variant: 'success',
                    autoHideDuration: 2000,
                });
                close();
    
    }
    catch(e){
        enqueueSnackbar('Failed to Update',{
            variant: 'error',
            autoHideDuration: 2000,
        });
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
      clusterid: item._source.clusterID,
      customerName: item._source.CustomerName,
      color: colorForThisCluster,
      deliveryAgentName:item._source.deliveryAgentName,
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
        console.log(res);
        res.data.hits.hits!==null &&     setDelivery(res.data.hits.hits);
} catch (error) {
    enqueueSnackbar('Problem Fetching Deliveries',{
        variant: 'error',
        autoHideDuration: 2000,
    });
}
}

export async function fetchClusters(props){
    const {bybId, setClusters,enqueueSnackbar,setLoading,setDelivery} = props;
        try{
    let clusters;
            const res = await API.get(`/clusters/allClusters?bybid=${bybId}`);
if(res.data.ClusterIDArray!==null && res.data!==undefined){
 clusters = createClusters({data:res.data});
console.log(clusters)
setClusters && setClusters(clusters)
setLoading && setLoading(false)
}else{
    console.log('reached')
    fetchDeliveries({bybID:bybId,setDelivery})
    setLoading && setLoading(false)

}
return clusters;
        }
        catch(err){
            console.log(err,"error from me")
            setLoading && setLoading(false)

            enqueueSnackbar  && enqueueSnackbar('There are no Clusters Yet',{
                variant: 'info',
                autoHideDuration: 2000,
            });
        }
        
    }


export async function postCluster(props){
    const {clusterData,enqueueSnackbar,setSubmitting,bybId, setCluster} = props;

    try{
        const config = {headers:{"Content-Type": "application/json"}}
        const body = clusterData
        
             await API.post("/clusters/createCluster",body,config);
             setSubmitting(false)
             enqueueSnackbar('Cluster will be updated in 5 minutes',{
                    variant: 'success',
                    autoHideDuration: 2000,
                });
                setCluster(null)    
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
    const {bybId, setClusters,setLoading} = props;
setLoading(true);
const calculateAverageWeight = (array) =>{
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

// const getTimeDistance = async (agentId) =>{
//     try{
//       console.log(res)
//       return {clusterTime:res.data.clusterTime || 0,clusterDistance:res.data.clusterDistance || 0}
//     }
//     catch(error){
//         console.log(error)
//     }
// }
    try {
    const clusterData = await fetchClusters({bybId})
    console.log(clusterData);
   const clusterOverview = clusterData.map( async (item,index)=>{
        const {distanceObserved, averageWeight} =  calculateTotals(item);
        const res = await API.get(`/clusters/timeNdistance?agentId=${item[0].deliveryAgentID}`);


        return {
            clusterid:item[0].clusterid,
            deliveryAgentID:item[0].deliveryAgentID,
            totalDeliveries:item.length,
            deliveryAgentName:item[0].deliveryAgentName,
            distanceObserved:distanceObserved,
            averageWeight:averageWeight,
            clusterTime:res.data.clusterTime>3600?`${(res.data.clusterTime/3600).toFixed(2)} hour`:res.data.clusterTime>60?`${(res.data.clusterTime/60).toFixed(2)} minutes`:`${res.data.clusterTime} sec`,
            clusterDistance:res.data.clusterDistance>1000000?`${(res.data.clusterDistance/1000000).toFixed(2)} K Km`:res.data.clusterDistance>1000?`${(res.data.clusterDistance/1000).toFixed(2)} Km`:`${res.data.clusterDistance} m`
        }
    })
//logic problem above always goes to first statement make first condition for hours then smaller
Promise.all(clusterOverview).then(result=>{
    console.log(result)
    setLoading(false);
    setClusters(result)
}).catch(error=>{
    setLoading(false);
})
} catch (error) {
    setLoading(false);
    console.log(error)
}

}


export async function getDeliveryStats(props){
    const {bybID, setStats} = props;
    try {
        const res = await API.get(`/delivery/deliveryStatus?bybID=${bybID}`);
console.log(res);
        setStats(res.data)
    } catch (error) {
        setStats([]);
        
    }

}