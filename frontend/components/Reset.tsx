import { gql, useMutation } from '@apollo/client';
import Form from '../atoms/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }: { token: string }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  const successfulError = data?.redeemUserPasswordResetToken;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await reset();
    if (!error) {
      resetForm();
    }
  };
  return (
    <Form method='post' onSubmit={handleSubmit}>
      <h2>Reset your password</h2>
      <fieldset>
        {!error && !successfulError && (
          <p>Success, your password has been updated</p>
        )}
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            placeholder='email'
            autoComplete='email'
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <fieldset>
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            placeholder='password'
            autoComplete='password'
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type='submit'>Request Reset</button>
      <Error error={error || successfulError} />
    </Form>
  );
}
