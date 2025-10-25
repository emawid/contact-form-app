import { useId } from 'react';

export default function Consent({ consent, onChange, onBlur, error }) {
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
