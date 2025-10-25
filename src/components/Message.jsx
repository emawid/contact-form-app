import { useId } from 'react';

export default function Message({ message, onChange, onBlur, error }) {
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
