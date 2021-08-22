import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './ShoppingCart.css';
import { ordersApi } from '../api';
const ShoppingCart = ({ setItemsList, itemsList }) => {
  const [ddl, setDdl] = useState(false);
  console.log('shoping,', itemsList);
  const calcTotal = () => {
    let total;
    if (itemsList.length > 0) {
      total = itemsList.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
      }, 0);
    } else {
      total = 0;
    }
    return total;
  };
  const totalPrice = calcTotal();
  const handleBuyClick = async () => {
    console.log('ite', itemsList);
    if (itemsList.length < 1) return '';
    await fetch(`${ordersApi}`, {
      method: 'POST',
      body: JSON.stringify({
        order: itemsList,
        total: totalPrice,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(() => {
        setItemsList([]);
        setDdl(false);
      })
      .catch((err) => err.response.data.error);
  };

  return (
    <div className='shopping-container'>
      <button onClick={() => setDdl(!ddl)} className='shopping-icon-container'>
        <p className='icon-text'>
          <FontAwesomeIcon fontSize={20} icon={faShoppingCart} /> Shopping Cart{' '}
          <span className='items-count'>{itemsList.length}</span>
        </p>
      </button>

      <div className={`ddl-container ${ddl && 'open'}`}>
        {itemsList.map((item, idx) => (
          <div className='element-container' key={idx}>
            <span style={{ fontWeight: 'bold' }}>{item.title}</span>
            <span style={{ fontSize: '14px' }}>qty:{item.quantity}</span>
            <span style={{ fontSize: '14px' }}>{item.price}$</span>
          </div>
        ))}
        <div className='checkout-container'>
          <p>Total: {totalPrice}$</p>
          <button
            onClick={handleBuyClick}
            style={{ minWidth: '70%', alignSelf: 'center' }}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCart;
