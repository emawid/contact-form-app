import { useId } from 'react';

export default function QueryType({ queryType, onChange, onBlur, error }) {
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
