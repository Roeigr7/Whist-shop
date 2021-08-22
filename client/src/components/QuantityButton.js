import React, { useState } from 'react';
import './QuantityButton.css';
const QuantityButton = ({ currentItemId, items, setItems }) => {
  const current = items.findIndex((item) => item._id === currentItemId);

  const handleQuantity = (value) => {
    //new arr for immutate
    const updatedArr = [...items];

    //update current item quantity
    let updateCurr = {
      ...items[current],
      quantity: items[current].quantity + value,
    };

    ///check if 0
    if (updateCurr.quantity === 0) {
      updatedArr.splice(current, 1);
    } else {
      updatedArr.splice(current, 1, updateCurr);
    }

    setItems(updatedArr);
  };

  return (
    <div className='quantity-container'>
      <div className='value-button' onClick={() => handleQuantity(-1)}>
        -
      </div>
      <input
        readOnly={true}
        className='input-container'
        value={items[current]?.quantity}
        type='number'
      />
      <div className='value-button' onClick={() => handleQuantity(+1)}>
        +
      </div>
    </div>
  );
};
export default QuantityButton;
