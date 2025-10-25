import { useId } from 'react';

export default function Email({ email, onChange, onBlur, error }) {
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
