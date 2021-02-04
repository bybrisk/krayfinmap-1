import React,{Suspense} from "react";
import { Route, Switch,Redirect} from "react-router-dom";
import Loader from 'components/application/Loader/Loader'
const ViewAgents = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ 'components/application/agentTable/table')
);
const ViewDeliveries = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ 'components/application/deliveryTable/table')
);
const ViewClusters = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ 'components/application/agentTable/table')
);

export const Dashboard = ({ match }) => {
      return (
        <Suspense fallback={<Loader/>}>

      <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/agents`} />
        <Route path={`${match.url}/agents`} 
                      render={(props) => <ViewAgents {...props} />}

         />
        <Route path={`${match.url}/deliveries`}
              render={(props) => <ViewDeliveries {...props} />}

        /> 
        <Route path={`${match.url}/clusters`}
              render={(props) => <ViewClusters {...props} />}


        /> 
      </Switch>
      </Suspense>
    );
  };


