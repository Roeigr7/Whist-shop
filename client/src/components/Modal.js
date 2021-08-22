import React, { useState } from 'react';
import './Modal.css';
import { productsApi } from '../api.js';
const Modal = ({ setShowModal, showModal, setReFetch }) => {
  const [error, setError] = useState(false);
  const [values, setValues] = useState({
    title: showModal?.props?.title || '',
    price: showModal?.props?.price || '',
    desc: showModal?.props?.desc || '',
    image: showModal?.props?.image || '',
    id: showModal?.props?._id || '',
  });
  const handleShow = () => {
    setShowModal(false);
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.desc.length < 5)
      return setError({
        type: 'desc',
        msg: 'description must be at least 5 letters',
      });
    const addorEditUrl = showModal.modalTitle === 'Add Item' ? '' : values.id;
    const addOrEditMethod =
      showModal.modalTitle === 'Add Item' ? 'POST' : 'PATCH';
    await fetch(`${productsApi}/${addorEditUrl}`, {
      method: addOrEditMethod,
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error)
          return setError({ type: 'cast', msg: 'must be a valid number' });
        setShowModal(false);
        setReFetch((prev) => !prev);
      })
      .catch((err) =>
        setError({ type: 'cast', msg: 'must be a valid number' })
      );
  };

  return (
    <div className='modal-backdrop'>
      <div className='modal-content'>
        <button onClick={handleShow} className='close-container'>
          <p className='close-btn'>x</p>
        </button>
        <h1>{showModal.modalTitle}</h1>

        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
              onChange={handleChange}
              value={values.title}
              type='text'
              name='title'
              placeholder='title..'
            />
            <label>Price</label>
            <input
              type='text'
              name='price'
              onChange={handleChange}
              value={values.price}
              placeholder='price..'
            />
            {error.type === 'cast' && (
              <div style={{ color: 'red', fontSize: '14px' }}>{error.msg}</div>
            )}
            <label>description</label>
            <input
              value={values.desc}
              type='text'
              onChange={handleChange}
              name='desc'
              placeholder='description..'
            />
            {error.type === 'desc' && (
              <div style={{ color: 'red', fontSize: '14px' }}>{error.msg}</div>
            )}
            <label>image</label>
            <input
              value={values.image}
              type='text'
              onChange={handleChange}
              name='image'
              placeholder='image url'
            />
            <input type='submit' value='Submit' />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Modal;
