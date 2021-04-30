import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import CatalogPage from "./CatalogPage";
import { Provider } from "redux-zero/react";
import store from "../store/store";

test("renders no items message", () => {
  render(
    <Provider store={store}>
      <CatalogPage data={[]} />
    </Provider>
  );
  const noItems = screen.getByText(/Please wait for items to be added/i);
  expect(noItems).toBeInTheDocument();
});

test("render CatalogPage", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <CatalogPage />{" "}
    </Provider>
  );

  expect(
    asFragment(
      <Provider store={store}>
        <CatalogPage />{" "}
      </Provider>
    )
  ).toMatchSnapshot();
});
