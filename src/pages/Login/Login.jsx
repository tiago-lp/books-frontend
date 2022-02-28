import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import loginSchema from '../../utils/loginSchema';
import { Context } from '../../contexts/AuthContext/AuthContext';

import {
  Container,
  Title,
  LoginContainer,
  HeaderContainer,
  LogoContainer,
  InputContainer,
  Input,
  Label,
  InputButton,
  Form,
  Error,
} from './styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [loginError, setloginError] = useState(false);

  const { login } = useContext(Context);

  const validateLoginSchema = async (requestBody) => {
    try {
      await loginSchema.validate(requestBody);
    } catch (err) {
      throw new Error(err.errors);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestBody = { email, password };
      await validateLoginSchema(requestBody);
      await login(email, password);
      setloginError(false);
      history.push('/home');
    } catch (error) {
      setloginError(true);
    }
  }

  return (
    <Container>
      <LoginContainer>
        <HeaderContainer>
          <LogoContainer />
          <Title>Books</Title>
        </HeaderContainer>
        <Form>
          <InputContainer>
            <Label htmlFor='email'>Email </Label>
            <Input
              name='email'
              type='text'
              id='email'
              onChange={(event) => setEmail(event.target.value)}
             />
          </InputContainer>

          <InputContainer>
            <Label htmlFor='password'>Senha </Label>
            <Input
              name='password'
              type='password'
              id='password'
              autoComplete='off'
              onChange={(event) => setPassword(event.target.value)}
             />
            <InputButton type='submit' value='Entrar' onClick={handleSubmit} />
          </InputContainer>
        </Form>
        {loginError && <Error>Email e/ou senha incorretos.</Error>}
      </LoginContainer>
    </Container>
  );
}

export default Login;
