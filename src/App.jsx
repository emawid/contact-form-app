//TODO:
//toaster with success message

import { useId, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import './App.css';

function Card() {
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

function Name({
  firstName,
  lastName,
  onChange,
  onBlur,
  firstNameError,
  lastNameError,
}) {
  const firstId = useId();
  const lastId = useId();

  return (
    <>
      <div className="form__container">
        <div className="form-group">
          <label className="form__label body-s" htmlFor={firstId}>
            First Name<span className="form__required">*</span>
          </label>
          <input
            className="form__input--text"
            name="firstName"
            value={firstName}
            onChange={onChange}
            onBlur={onBlur}
            id={firstId}
            type="text"
            autoComplete="given-name"
            required
          />
          <span
            className={`body-sm form-error${firstNameError ? ' visible' : ''}`}>
            {firstNameError || '\u00A0'}
          </span>
        </div>

        <div className="form-group">
          <label className="form__label body-s" htmlFor={lastId}>
            Last Name<span className="form__required">*</span>
          </label>
          <input
            className="form__input--text"
            name="lastName"
            value={lastName}
            onChange={onChange}
            onBlur={onBlur}
            id={lastId}
            type="text"
            autoComplete="family-name"
            required
          />
          <span
            className={`body-sm form-error${lastNameError ? ' visible' : ''}`}>
            {lastNameError || '\u00A0'}
          </span>
        </div>
      </div>
    </>
  );
}

function Email({ email, onChange, onBlur, error }) {
  const emailId = useId();

  return (
    <div className="form-group">
      <label className="form__label body-s" htmlFor={emailId}>
        Email Address<span className="form__required">*</span>
      </label>
      <input
        className="form__input--text"
        type="email"
        id={emailId}
        name="email"
        value={email}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="email"
      />
      <span className={`body-sm form-error${error ? ' visible' : ''}`}>
        {error || '\u00A0'}
      </span>
    </div>
  );
}

function QueryType({ queryType, onChange, onBlur, error }) {
  const generalId = useId();
  const supportId = useId();

  return (
    <fieldset className="form__query">
      <legend className="body-s">
        Query Type<span className="form__required">*</span>
      </legend>
      <div className="form__container">
        <label className="radio__label body-m">
          <input
            id={generalId}
            className="radio__button"
            type="radio"
            name="queryType"
            value="general"
            checked={queryType === 'general'}
            onChange={onChange}
            onBlur={onBlur}
            required
          />
          General Enquiry
        </label>
        <label className="radio__label body-m">
          <input
            id={supportId}
            className="radio__button"
            type="radio"
            name="queryType"
            value="support"
            checked={queryType === 'support'}
            onChange={onChange}
            onBlur={onBlur}
          />
          Support Enquiry
        </label>
      </div>
      <span className={`body-sm form-error${error ? ' visible' : ''}`}>
        {error || '\u00A0'}
      </span>
    </fieldset>
  );
}

function Message({ message, onChange, onBlur, error }) {
  const id = useId();
  return (
    <>
      <div className="form-group">
        <label className="body-s" htmlFor={id}>
          Message<span className="form__required">*</span>
        </label>
        <textarea
          className="form__input-message"
          id={id}
          type="text"
          name="message"
          value={message}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
        <span className={`body-sm form-error${error ? ' visible' : ''}`}>
          {error || '\u00A0'}
        </span>
      </div>
    </>
  );
}

function Consent({ consent, onChange, onBlur, error }) {
  const id = useId();

  return (
    <div>
      <div className="form__consent">
        <label className="form__consent-label body-s" htmlFor={id}>
          <input
            className="form__consent-checkbox"
            type="checkbox"
            id={id}
            name="consent"
            checked={consent}
            onChange={onChange}
            onBlur={onBlur}
          />
          <span className="form__consent-custom"></span>I consent to being
          contacted by the team
          <span className="form__required">*</span>
        </label>
      </div>
      <span className={`body-sm form-error${error ? ' visible' : ''}`}>
        {error || '\u00A0'}
      </span>
    </div>
  );
}

function SubmitButton() {
  return (
    <button
      type="submit"
      className="form__submit-button body-md-bold btn-reset">
      Submit
    </button>
  );
}

export default function App() {
  return <Card />;
}
