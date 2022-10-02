import { all, takeLatest, select } from "redux-saga/effects";
import { addProductToCart } from "./actions";
import { IState } from "../..";

type CheckProductStockRequest = ReturnType<typeof addProductToCart>;
function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;
  const currentQuantity: number = yield select((state: IState) => {
    return (
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
    );
  });
  console.log(
    "🚀 ~ file: sagas.ts ~ line 14 ~ constcurrentQuantity:number=yieldselect ~ currentQuantity",
    currentQuantity
  );

  console.log("Added to chart");
}

export default all([takeLatest("ADD_PRODUCT_TO_CART", checkProductStock)]);
