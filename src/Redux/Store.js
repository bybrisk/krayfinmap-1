import { createStore } from "redux";
import AllReducers from "./reducer";
const store = createStore(AllReducers);

export default store;
