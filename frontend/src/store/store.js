import createStore from "redux-zero";

const initialState = { items: [] };
const store = createStore(initialState);

export default store;