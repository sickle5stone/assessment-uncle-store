import {
  Card as BlueprintCard,
  Button,
  ButtonGroup,
  Classes,
  Dialog,
  Divider,
  Elevation,
} from "@blueprintjs/core";

import { ItemDialog } from "../ItemDialog";
import React from "react";
import css from "./Card.module.css";

const Card = (props) => {
  const { data, canEdit } = props;
  const [isOpen, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [input, setInput] = React.useState({ ...data });

  const handleOnChange = (e) =>
    setInput({ ...input, [e.target.id]: e.target.value });

  const handlePriceChange = (num) => {
    setInput({ ...input, price: num });
  };

  const handleUpdateItem = () => {
    const { handleUpdateItem } = props;
    handleUpdateItem(input);
    setEditOpen(false);
  };

  const handleDeleteItem = () => {
    const { handleDeleteItem, data } = props;
    handleDeleteItem(data);
    setDeleteOpen(false);
  };

  return (
    <BlueprintCard className={css.root} elevation={Elevation.TWO}>
      <h3>{data?.name || "Product"}</h3>
      <p>
        Price: <b>${data?.price}</b>
      </p>
      <Divider vertical />
      <ButtonGroup fill>
        <Button
          intent="warning"
          large
          fill
          icon="shopping-cart"
          onClick={() => setOpen(!isOpen)}
        >
          Buy
        </Button>
        {canEdit && (
          <React.Fragment>
            <Button
              intent="success"
              large
              fill
              icon="settings"
              onClick={() => setEditOpen(!editOpen)}
            >
              Edit
            </Button>
            <Button
              intent="danger"
              large
              fill
              icon="delete"
              onClick={() => setDeleteOpen(!isOpen)}
            >
              Delete
            </Button>
          </React.Fragment>
        )}
      </ButtonGroup>
      <React.Fragment>
        <Dialog
          isOpen={isOpen}
          canEscapeKeyClose
          canOutsideClickClose
          onClose={() => setOpen(false)}
        >
          <div className={Classes.DIALOG_BODY}>To be implemented!</div>
        </Dialog>
        <ItemDialog
          editMode
          input={input}
          isOpen={editOpen}
          handlePriceChange={handlePriceChange}
          handleOnChange={handleOnChange}
          handleUpdateItem={handleUpdateItem}
          handleOpenDialog={() => setEditOpen(!editOpen)}
        />
        <Dialog isOpen={deleteOpen}>
          <div className={Classes.DIALOG_BODY}>
            <p>
              Are you sure you want to delete <b>{data?.name}</b>?
            </p>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button onClick={() => handleDeleteItem()} intent="danger">
                  Delete
                </Button>
                <Button
                  onClick={() => setDeleteOpen(!deleteOpen)}
                  intent="warning"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      </React.Fragment>
    </BlueprintCard>
  );
};

export default Card;
