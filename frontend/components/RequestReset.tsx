import { gql, useMutation } from '@apollo/client';
import Form from '../atoms/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import { SIGNIN_MUTATION } from './SignIn';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [signup, { data, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup();
    if (!error) {
      resetForm();
    }
  };
  return (
    <Form method='post' onSubmit={handleSubmit}>
      <h2>Request a password reset</h2>
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success, check your email for a link</p>
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
      <button type='submit'>Request Reset</button>
      <Error error={error} />
    </Form>
  );
}
