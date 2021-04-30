import {
  Alignment,
  Button,
  Classes,
  Dialog,
  Navbar,
  NonIdealState,
  Spinner,
} from "@blueprintjs/core";

import { Card } from "../component/Card";
import { ItemDialog } from "../component/ItemDialog";
import React from "react";
import actions from "../store/actions.js";
import { connect } from "redux-zero/react";
import css from "./CatalogPage.module.css";

class CatalogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isAdminOpen: false,
      adminMode: true,
      input: {
        name: "",
        price: 0,
      },
    };
  }

  componentDidMount() {
    const { getList } = this.props;
    getList();
  }

  renderCards = () => {
    const { items } = this.props;
    const { adminMode } = this.state;

    return items?.map((item) => {
      return (
        <Card
          key={item.id}
          data={item}
          className={css.card}
          canEdit={adminMode}
          handleUpdateItem={this.handleUpdateItem}
          handleDeleteItem={this.handleDeleteItem}
        />
      );
    });
  };

  renderAdminDialog = () => {
    const { isAdminOpen } = this.state;

    return (
      <Dialog isOpen={isAdminOpen} className={Classes.DIALOG}>
        <div className={Classes.DIALOG_BODY}>
          <p>
            This is to simulate a login screen, SSO / 3rd party SAML provider
            login can be done here
          </p>
          <Button onClick={() => this.handleLogin()} intent="Success" large>
            Login!
          </Button>
          <Button onClick={() => this.handleLogout()} intent="danger" large>
            Logout
          </Button>
        </div>
      </Dialog>
    );
  };

  renderDialog = () => {
    const { isOpen, input } = this.state;
    return (
      <ItemDialog
        handleOpenDialog={this.handleOpenDialog}
        handleAddItem={this.handleAddItem}
        handleOnChange={this.handleOnChange}
        handlePriceChange={this.handlePriceChange}
        handleClose={this.handleOpenDialog}
        isOpen={isOpen}
        input={input}
      />
    );
  };

  handleDeleteItem = (itemToDelete) => {
    this.setState({ loading: true });
    const { deleteItem, getList } = this.props;

    deleteItem({ itemToDelete });

    setTimeout(() => {
      getList();
      this.setState({ loading: false });
    }, 1000);
  };

  handleUpdateItem = (editedItem) => {
    this.setState({ loading: true });
    const { updateItem, getList } = this.props;

    updateItem({ editedItem });

    setTimeout(() => {
      getList();
      this.setState({ loading: false });
    }, 1000);
  };

  handleLogin = () => {
    this.setState({ isAdminOpen: false, adminMode: true });
  };

  handleLogout = () => {
    this.setState({ isAdminOpen: false, adminMode: false });
  };

  handleOnChange = (e) => {
    const { input } = this.state;
    this.setState({ input: { ...input, [e.target.id]: e.target.value } });
  };

  handlePriceChange = (num, numString) => {
    const { input } = this.state;
    this.setState({ input: { ...input, price: numString } });
  };

  handleAddItem = () => {
    this.setState({ loading: true });

    const { addItem, getList } = this.props;
    const { input } = this.state;
    addItem({ input });

    // Close dialog and refresh page
    this.handleOpenDialog();
    setTimeout(() => {
      getList();
      this.setState({ loading: false, input: { name: "", price: 0 } });
    }, 1000);
  };

  handleOpenDialog = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  handleOpenAdminDialog = () => {
    const { isAdminOpen } = this.state;
    this.setState({ isAdminOpen: !isAdminOpen });
  };

  render() {
    const { adminMode, loading: isLoading } = this.state;
    const { loading, items } = this.props;

    return (
      <React.Fragment>
        <Navbar className={Classes.DARK}>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Uncle's Store</Navbar.Heading>
            <Navbar.Divider />
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            <Button
              className={Classes.BUTTON}
              icon="cog"
              text="Admin Mode"
              intent="warning"
              onClick={() => this.handleOpenAdminDialog()}
            />
          </Navbar.Group>
        </Navbar>

        <div className={css.root}>
          {adminMode && (
            <div className={css.sidebar}>
              <h3>Admin Panel</h3>

              <Button
                intent="primary"
                className={Classes.LARGE}
                onClick={() => this.handleOpenDialog()}
              >
                Create an Item
              </Button>
            </div>
          )}

          <div className={css.body}>
            {items?.length < 1 && (
              <NonIdealState
                icon={this.state.icon ? "search" : undefined}
                title={adminMode ? "You have no items." : "We are restocking!"}
                description={
                  adminMode
                    ? "Add items from panel!"
                    : "Please wait for items to be added..."
                }
              />
            )}
            {loading || isLoading ? <Spinner /> : this.renderCards()}
          </div>
        </div>
        {this.renderDialog()}
        {this.renderAdminDialog()}
      </React.Fragment>
    );
  }
}

const mapToProps = ({ items, getList, loading }) => ({
  items,
  getList,
  loading,
});

export default connect(mapToProps, actions)(CatalogPage);
