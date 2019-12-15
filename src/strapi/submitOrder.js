// submit order
import axios from 'axios';
import url from '../utils/URL';

const submitOrder = async ({ name, total, items, stripeTokenId, userToken }) => {
    const response = await axios.post(`${url}/orders`, {
        name, total, items, stripeTokenId
    }, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    }).catch(e => console.log(JSON.stringify(e, null, 2)));

    return response;
}
export default submitOrder;