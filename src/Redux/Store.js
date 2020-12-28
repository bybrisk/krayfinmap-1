import { createStore } from "redux";
import AllReducers from "./Reducer";
const store = createStore(AllReducers);

export default store;
