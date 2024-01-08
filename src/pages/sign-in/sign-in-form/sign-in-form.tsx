import { useAppDispatch } from '../../../hooks';
import { signIn } from '../../../store/api-actions.ts';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';

interface FormFields {
  'user-email': string;
  'user-password': string;
}

const INITIAL_FORM_STATE: FormFields = {
  'user-email': '',
  'user-password': '',
};

export default function SignInForm() {
  const {
    handleSubmit,
    control,
    formState: { isValid }
  } = useForm<FormFields>({
    defaultValues: INITIAL_FORM_STATE,
    mode: 'all',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  function handleSignIn(data: FormFields) {
    setIsSubmitting(true);
    dispatch(signIn({ email: data['user-email'], password: data['user-password'] }))
      .unwrap()
      .finally(() => setIsSubmitting(false));
  }

  return (
    <form onSubmit={(event) => void handleSubmit(handleSignIn)(event)} className="sign-in__form">
      <div className="sign-in__fields">
        <div className="sign-in__field">
          <Controller
            name="user-email"
            control={control}
            disabled={isSubmitting}
            rules={{
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Email must be valid',
              },
            }}
            render={({ field }) => (
              <input
                className="sign-in__input"
                placeholder="Email address"
                id="user-email"
                {...field}
                type="email"
              />
            )}
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
        </div>
        <div className="sign-in__field">
          <Controller
            name="user-password"
            control={control}
            disabled={isSubmitting}
            rules={{
              required: true,
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z]).*$/,
                message: 'Password must contain at least 1 number and 1 letter',
              },
            }}
            render={({ field }) => (
              <input
                className="sign-in__input"
                placeholder="Password"
                id="user-password"
                {...field}
                type="password"
              />
            )}
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn" type="submit" disabled={!isValid || isSubmitting}>Sign in</button>
      </div>
    </form>
  );
}
