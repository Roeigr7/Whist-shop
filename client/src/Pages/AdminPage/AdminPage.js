import React, { useState } from 'react';
import { productsApi } from '../../api';
import useFetch from '../../hooks/useFetch';
import Modal from '../../components/Modal';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './AdminPage.css';

const AdminPage = () => {
  const [reFetch, setReFetch] = useState(false);
  const [showModal, setShowModal] = useState({ open: false, props: '' });
  const { data, isLoading, error } = useFetch(productsApi, reFetch);

  const handleDelete = async (id) => {
    await fetch(`${productsApi}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => setReFetch(!reFetch))
      .catch((err) => err.response.data.error);
  };

  if (isLoading) return 'Loading...';
  if (error) return `ERROR FROM THE SERVER ${error}`;
  return (
    <div>
      {showModal.open && (
        <Modal
          setReFetch={setReFetch}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

      <h1 style={{ margin: '20px auto 30px auto' }}>Admin</h1>
      <button
        onClick={() => setShowModal({ open: true, modalTitle: 'Add Item' })}
        className='add-item-container'
      >
        <p className='add-item-text'>
          <FontAwesomeIcon fontSize={20} font={30} icon={faShoppingCart} /> Add
          Product
        </p>
      </button>
      <div className='products-list-container'>
        <table className='products'>
          <tbody>
            <tr>
              <th style={{ textAlign: 'center' }}>Title</th>
              <th style={{ textAlign: 'center' }}>Price</th>
              <th style={{ textAlign: 'center' }}>Option</th>
            </tr>
            {data?.map((item, idx) => (
              <tr key={idx}>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td className='option-container'>
                  <button
                    onClick={() =>
                      setShowModal({
                        open: true,
                        props: data[idx],
                        modalTitle: 'Edit Item',
                      })
                    }
                  >
                    edit
                  </button>
                  <button onClick={() => handleDelete(item._id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminPage;
