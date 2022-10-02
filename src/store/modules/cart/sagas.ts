import { all, takeLatest, select, call, put } from "redux-saga/effects";
import {
  addProductToCartRequest,
  addProductToCartSuccess,
  addProductToCartFailure,
} from "./actions";
import { IState } from "../..";
import api from "../../../services/api";
import { AxiosResponse } from "axios";
import { ActionsTypes } from "./types";

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;
interface IStockReponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;
  const currentQuantity: number = yield select((state: IState) => {
    return (
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
    );
  });

  const availableStockResponse: AxiosResponse<IStockReponse> = yield call(
    api.get,
    `stock/${product.id}`
  );

  yield put(
    availableStockResponse.data.quantity > currentQuantity
      ? addProductToCartSuccess(product)
      : addProductToCartFailure(product.id)
  );
}

export default all([
  takeLatest(ActionsTypes.addProductToCartRequest, checkProductStock),
]);
