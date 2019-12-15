import React from "react";
import { UserContext } from '../context/user';
import { CartContext } from '../context/cart';

import { useHistory } from 'react-router-dom';
import EmptyCart from '../components/Cart/EmptyCart';

//stripe elements
import { CardElement, StripeProvider, Elements, injectStripe } from 'react-stripe-elements';
import submitOrder from '../strapi/submitOrder';

function Checkout(props) {
  const { cart, total, clearCart } = React.useContext(CartContext);
  const { user, showAlert, hideAlert, alert } = React.useContext(UserContext);
  const history = useHistory();

  //state values
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');

  const isEmpty = !name || alert.show;

  const handleSubmit = async (e) => {
    console.log("--")
    e.preventDefault();
    showAlert({ mg: 'submitting order.. wait..' });
    const response = await props.stripe.createToken().catch(e => console.log(e));

    console.log("stripe res: ", JSON.stringify(response, null, 2));

    const { token } = response;
    if (token) {
      setError('');
      const { id } = token;
      let order = await submitOrder({ name: name, total: total, items: cart, stripeTokenId: id, userToken: user.token })
      if (order) {
        showAlert({ msg: 'your order is complete' });
        clearCart();
        history.push('/');
        return;
      } else {

        showAlert({ msg: 'there was an erro with your order', type: 'danger' })
      }
    } else {
      hideAlert();
      setError(response.error.message);
    }
  }

  if (cart.length < 1) return <EmptyCart />;


  return <section className='section form'>
    <h2 className='section-title'>checkout</h2>
    <form className='checkout-form'>
      <h3>order total: <span>{total}</span></h3>
      <div className='form-control'>
        <label htmlFor='name'>name</label>
        <input type='text' id='name' value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div className='stripe-input'>
        <label htmlFor='card-element'>credit or debit cart</label>
        <p className='stripe-info'>text using this credit card: <span>4242 4242 4242 4242</span>
          <br />enter any 5 digits for the zip code
        <br /> any 3 numbers for cvc</p>
        {/*stripe elemnt */}
        <CardElement className='card-element'></CardElement>
        {/*stripe errors */}
        {error && <p className='form-empty'>{error}</p>}
        {isEmpty ?
          <p className='form-empty'>please fill out name field</p> :
          <button type='submit' onClick={handleSubmit} className='btn btn-primary btn-block'>submit</button>
        }
      </div>
    </form>
  </section>;
}

const CardForm = injectStripe(Checkout);
const StripeWrapper = () => {
  return <StripeProvider apiKey={process.env.REACT_APP_STRAPI_KEY}>
    <Elements>
      <CardForm>
      </CardForm>
    </Elements>
  </StripeProvider>
}

export default StripeWrapper;