import axios from 'axios'
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
} from '../constants/productConstants'
import { REQUEST, SUCCESS, FAIL } from '../reducers/productLisreducer'
const listProducts = () => async dispatch => {
  try {
    dispatch(REQUEST())

    const { data } = await axios.get('/api/products')

    dispatch(SUCCESS(data))
  } catch (error) {
    dispatch(
      FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export default listProducts
