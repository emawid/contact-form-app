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

  const firstErrorId = `${firstId}-error`;
  const lastErrorId = `${lastId}-error`;

  return (
    <fieldset className="form__fieldset">
      <legend className="form__legend sr-only">Personal Infomation</legend>
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
            aria-invalid={firstNameError ? 'true' : 'false'}
            aria-describedby={firstNameError ? firstErrorId : undefined}
          />
          <span
            id={firstErrorId}
            className={`body-sm form-error${firstNameError ? ' visible' : ''}`}
            role={firstNameError ? 'alert' : undefined}
            aria-live="polite">
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
            id={lastErrorId}
            className={`body-sm form-error${lastNameError ? ' visible' : ''}`}
            role={lastNameError ? 'alert' : undefined}
            aria-live="polite">
            {lastNameError || '\u00A0'}
          </span>
        </div>
      </div>
    </fieldset>
  );
}
