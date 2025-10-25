import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Name from './Name';
import Email from './Email';
import QueryType from './QueryType';
import Message from './Message';
import Consent from './Consent';
import SubmitButton from './SubmitButton';

export default function Card() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    queryType: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState({});

  function validateField(name, value) {
    const normalized = typeof value === 'string' ? value.trim() : value;
    switch (name) {
      case 'firstName':
        return value.trim() ? '' : 'This field is required';
      case 'lastName':
        return value.trim() ? '' : 'This field is required';
      case 'email': {
        if (!normalized) {
          return 'Please enter your email address';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(normalized)
          ? ''
          : 'Please enter a valid email address';
      }
      case 'queryType':
        return value.trim() ? '' : 'Please select a query type';
      case 'message':
        return value.trim() ? '' : 'This field is required';
      case 'consent':
        return value
          ? ''
          : 'To submit this form, please consent to being contacted';
    }
  }

  function handleBlur(e) {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    const errorMsg = validateField(name, fieldValue);
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  }

  function handleChange(e) {
    const { name, type, value, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    console.log(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    //validation and submit logic here
    const newErrors = {};

    Object.entries(form).forEach(([name, value]) => {
      const errorMsg = validateField(name, value);
      if (errorMsg) {
        newErrors[name] = errorMsg;
      }
    });

    setErrors(newErrors);

    console.log(newErrors);

    if (Object.keys(newErrors).length === 0) {
      //Submit form
      console.log('Form submitted', form);
      toast.custom(
        <div className="toaster">
          <div className="toaster__content">
            <div className="toaster__container">
              <img
                src="/public/icon-success-check.svg"
                width={20}
                height={21}
                alt="success icon"
              />
              <p className="toaster__text">Message Sent!</p>
            </div>
            <p className="toaster__text">
              Thanks for completing the form. We'll be in touch soon!
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="card__header heading">Contact Us</h1>
        <form noValidate onSubmit={handleSubmit} className="form">
          <Name
            firstName={form.firstName}
            lastName={form.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            firstNameError={errors.firstName}
            lastNameError={errors.lastName}
          />
          <Email
            email={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <QueryType
            queryType={form.queryType}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.queryType}
          />
          <Message
            message={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.message}
          />
          <Consent
            consent={form.consent}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.consent}
          />
          <SubmitButton />
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
}
