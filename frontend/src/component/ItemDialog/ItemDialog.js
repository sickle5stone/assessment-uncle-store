import {
  Button,
  Classes,
  Dialog,
  FormGroup,
  InputGroup,
  NumericInput,
} from "@blueprintjs/core";

import React from "react";
import classNames from "classnames";
import css from "./ItemDialog.module.css";

const ItemDialog = (props) => {
  const {
    handleOpenDialog,
    handleAddItem,
    handleUpdateItem,
    handleOnChange,
    handlePriceChange,
    isOpen,
    input,
    editMode,
  } = props;

  const [invalidName, setInvalidName] = React.useState(false);
  const [invalidPrice, setInvalidPrice] = React.useState(false);
  const inputGroupCn = classNames(
    Classes.LARGE,
    css.input,
    invalidName && css.error
  );

  const disableButton =
    input.name?.length < 1 || input.price < 0.01 || invalidName || invalidPrice;

  return (
    <Dialog
      isOpen={isOpen}
      canEscapeKeyClose
      canOutsideClickClose={false}
      onClose={handleOpenDialog}
      title="Create an Item"
      className={css.dialog}
    >
      <div className={Classes.DIALOG_BODY}>
        <p>Fill in item details</p>
        <FormGroup>
          <InputGroup
            className={inputGroupCn}
            value={input.name}
            id="name"
            placeholder="Name of Product"
            leftIcon="label"
            onChange={(e) => {
              handleOnChange(e);
              if (e.target.value?.length < 1) {
                setInvalidName(true);
              } else {
                setInvalidName(false);
              }
            }}
            fill
          ></InputGroup>
          <NumericInput
            large
            className={invalidPrice && css.error}
            value={input.price}
            id="price"
            placeholder="Price of Product"
            onValueChange={(num, numString) => {
              handlePriceChange(num, numString);
              if (numString?.length < 1) {
                setInvalidPrice(true);
              } else {
                setInvalidPrice(false);
              }
            }}
            allowNumericCharactersOnly
            leftIcon="dollar"
            fill
          ></NumericInput>
          {(invalidPrice || invalidName) && (
            <span className={css.errorMessage}>Invalid name/price</span>
          )}
        </FormGroup>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            {editMode ? (
              <Button
                intent="warning"
                disabled={disableButton}
                onClick={() => handleUpdateItem()}
              >
                Update Item
              </Button>
            ) : (
              <Button
                intent="success"
                disabled={disableButton}
                onClick={() => handleAddItem()}
              >
                Add Item to Store
              </Button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ItemDialog;
