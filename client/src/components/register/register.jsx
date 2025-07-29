import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { lightFormat } from 'date-fns';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { BsXCircleFill } from 'react-icons/bs';

import { saveDataToServer } from '../../utils/send-data-to-server';
import styles from './registration.module.css';

const Registration = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    id: '',
  });

  const [formState, setFormState] = useState({
    status: null,
    error: null,
  });

  const navigate = useNavigate();
  const modalRef = useRef();
  const [showExtraFields, setShowExtraFields] = useState(false);

  const validateForm = () => {
    const { fullName, email, password, confirmPassword, id } = form;

    if (!fullName || !email || !password || !confirmPassword || !id) {
      alert('Please fill out all required fields.');
      return false;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return false;
    }
    if (id.length !== 13) {
      alert('ID is required.');
      return false;
}

    return true;
  };

  const handleFormChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const register = async () => {
    const valid = validateForm();
    if (!valid) return;

    setFormState({ status: 'saving', error: null });

    const res = await saveDataToServer('/auth/register', form)
      .catch(err => {
        setFormState({ status: null, error: err });
        console.error(err);
        alert('Registration failed.');
        return false;
      });

    if (res.success) {
      setFormState({ status: 'saved', error: null });
      navigate('/login');
    } else {
      setFormState({ status: null, error: 'Registration failed' });
    }
  };

  const openModal = () => modalRef.current.showModal();
  const closeModal = () => modalRef.current.close();
  const toggleShowExtraFields = () => setShowExtraFields(prev => !prev);
  const clearDOB = () => setForm(prev => ({ ...prev, dob: '' }));

  return (
    <>
      <dialog ref={modalRef} className={styles.dialog}>
        <div className={styles.xWrapper}>
          <BsXCircleFill onClick={closeModal} className={styles.x} />
        </div>
        <input
          className={styles.input}
          type='date'
          name='dob'
          value={form.dob}
          onChange={handleFormChange}
          min='1900-01-01'
          max={lightFormat(new Date(), 'yyyy-MM-dd')}
        />
        <div className={styles.dBtnWrapper}>
          <button onClick={clearDOB}>Clear DOB</button>
          <button className='secondary-btn' onClick={register}>Register</button>
        </div>
      </dialog>

      <h1 className={styles.h1}>Register</h1>
      <p>
        {
          formState.error
            ? 'There was an error during registration.'
            : formState.status === 'saving'
              ? 'Registering...'
              : formState.status === 'saved'
                ? 'Registration successful!'
                : ''
        }
      </p>

      <input
        className={styles.input}
        name='fullName'
        placeholder='Full Name'
        value={form.fullName}
        onChange={handleFormChange}
      />
      <input
        className={styles.input}
        name='email'
        type='email'
        placeholder='Email'
        value={form.email}
        onChange={handleFormChange}
      />
      <input
        className={styles.input}
        name='password'
        type='password'
        placeholder='Password'
        value={form.password}
        onChange={handleFormChange}
      />
      <input
        className={styles.input}
        name='confirmPassword'
        type='password'
        placeholder='Confirm Password'
        value={form.confirmPassword}
        onChange={handleFormChange}
      />

        <input
        className={styles.input}
        name='id'
        type='id'
        placeholder='Enter id'
        value={form.id}
        onChange={handleFormChange}
      />

      <div className={styles.btnWrapper}>
        <button onClick={register}>Register</button>
        <IoIosArrowDropdownCircle
          className={styles.dropdown}
          onClick={toggleShowExtraFields}
        />
      </div>

      {showExtraFields &&
        <button className='secondary-btn' onClick={openModal}>Add Date of Birth</button>}
    </>
  );
};

export default Registration;
