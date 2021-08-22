import React, { useState } from 'react';
import './HomePage.css';
import ShoppingCart from '../../components/ShoppingCart';
import useFetch from '../../hooks/useFetch';
import { productsApi } from '../../api';
import QuantityButton from '../../components/QuantityButton';
const HomePage = () => {
  const [buyedItems, setBuyedItems] = useState([]);

  const { data, isLoading, error } = useFetch(productsApi);

  console.log('ss', buyedItems);
  const handleBuyItem = (item) => {
    setBuyedItems([...buyedItems, { ...item, quantity: 1 }]);
  };
  if (isLoading) return 'Loading...';
  if (error) return `ERROR FROM THE SERVER ${error}`;
  return (
    <div>
      <h1 style={{ margin: '20px auto 30px auto' }}>Home</h1>
      <ShoppingCart setItemsList={setBuyedItems} itemsList={buyedItems} />
      <div className='grid-container'>
        {data &&
          data.map((item, idx) => (
            <div key={item._id} className='item-container'>
              <img className='item-img' src={item.image} alt={item.title} />
              <p>
                Title: <span>{item.title}</span>
              </p>
              <p>
                Desc: <span>{item.desc}</span>
              </p>
              <p>
                Price: <span>{item.price}</span>
              </p>
              {!buyedItems.some((prod) => prod._id === item._id) ? (
                <button onClick={() => handleBuyItem(item)}>Buy</button>
              ) : (
                <QuantityButton
                  currentItemId={item._id}
                  items={buyedItems}
                  setItems={setBuyedItems}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
export default HomePage;
