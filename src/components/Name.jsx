import { useId } from 'react';

export default function Name({
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
