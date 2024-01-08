import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { signIn } from '../../../store/api-actions.ts';

interface FormFields {
  email: string;
  password: string;
}

const INITIAL_FORM_STATE: FormFields = {
  email: '',
  password: '',
};

export default function SignInForm() {
  const [formValues, setFormValues] = useState<FormFields>(INITIAL_FORM_STATE);
  const dispatch = useAppDispatch();

  function handleFormChange(updatedValues: Partial<FormFields>) {
    setFormValues((values) => ({ ...values, ...updatedValues }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(signIn(formValues));
  }

  return (
    <form onSubmit={handleSubmit} className="sign-in__form">
      <div className="sign-in__fields">
        <div className="sign-in__field">
          <input
            className="sign-in__input"
            type="email"
            placeholder="Email address"
            name="user-email"
            id="user-email"
            value={formValues.email}
            onChange={(event) => handleFormChange({ email: event.target.value })}
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
        </div>
        <div className="sign-in__field">
          <input
            className="sign-in__input"
            type="password"
            placeholder="Password"
            name="user-password"
            id="user-password"
            value={formValues.password}
            onChange={(event) => handleFormChange({ password: event.target.value })}
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn" type="submit">Sign in</button>
      </div>
    </form>
  );
}
