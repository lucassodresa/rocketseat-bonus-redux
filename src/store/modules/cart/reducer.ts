import { Reducer } from "redux";
import produce from "immer";
import { ICartState, ActionsTypes } from "./types";

const INITIAL_STATE: ICartState = { items: [], failedStockCheck: [] };

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionsTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInChartIndex = draft.items.findIndex(
          (item) => item.product.id === product.id
        );

        if (productInChartIndex >= 0) {
          draft.items[productInChartIndex].quantity++;
        } else {
          draft.items.push({ product, quantity: 1 });
        }

        break;
      }
      case ActionsTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);
        console.log("failure", action.payload);
        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default cart;
