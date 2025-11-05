import { useId } from 'react';

export default function Email({ email, onChange, onBlur, error }) {
  const emailId = useId();
  const errorId = `${emailId}-error`;

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
        required
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
      />
      <span
        id={errorId}
        className={`body-sm form-error${error ? ' visible' : ''}`}
        role={error ? 'alert' : undefined}
        aria-live="polite">
        {error || '\u00A0'}
      </span>
    </div>
  );
}
