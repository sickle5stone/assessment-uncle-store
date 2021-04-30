import { Intent, Toaster } from "@blueprintjs/core";

import axios from "axios";

const handleError = (error) => {
  const toaster = Toaster.create();
  toaster.show({ intent: Intent.DANGER, message: error?.message || "Error" });
};

const handleSuccess = (message) => {
  const toaster = Toaster.create();
  toaster.show({ intent: Intent.SUCCESS, message });
};

const backendApiHost = "https://uncle-store-acs4ewqggq-uc.a.run.app";

const actions = (store) => ({
  /**
    Retrieves the list of items from database
  */
  getList: (state) => {
    const currentState = store.getState();
    store.setState({
      ...currentState,
      loading: true,
    });

    axios
      .get(`${backendApiHost}/listItems`)
      .then((response) => {
        store.setState({
          items: response.data,
          loading: false,
        });
      })
      .catch((e) => {
        store.setState({
          loading: false,
        });
        handleError();
      });
  },

  /**
    Adds Item to database via API request
    Payload: { name: string, price: number }
   */
  addItem: (state, payload) => {
    const currentState = store.getState();
    store.setState({
      ...currentState,
      loading: true,
    });

    axios
      .post(`${backendApiHost}/addItem`, { ...payload.input })
      .then((response) => {
        store.setState({
          loading: false,
        });

        handleSuccess(`${response.data.name || "item"} added!`);
      })
      .catch((e) => {
        store.setState({
          loading: false,
        });
        handleError();
      });
  },

  /**
    Updates item in database
   */
  updateItem: (state, payload) => {
    const currentState = store.getState();
    store.setState({
      ...currentState,
      loading: true,
    });

    axios
      .post(`${backendApiHost}/updateItem`, { ...payload.editedItem })
      .then((response) => {
        store.setState({
          loading: false,
        });

        handleSuccess(`${response.data.name || "item"} updated!`);
      })
      .catch((e) => {
        store.setState({
          loading: false,
        });
        handleError();
      });
  },

  /**
    Deletes item in database
   */
  deleteItem: (state, payload) => {
    const currentState = store.getState();
    store.setState({
      ...currentState,
      loading: true,
    });

    axios
      .delete(`${backendApiHost}/deleteItem`, { data: payload })
      .then((response) => {
        store.setState({
          loading: false,
        });

        handleSuccess(`${response.data.name || "item"} deleted!`);
      })
      .catch((e) => {
        store.setState({
          loading: false,
        });
        handleError();
      });
  },
});
export default actions;
