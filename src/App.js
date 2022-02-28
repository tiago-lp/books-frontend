import GlobalStyle from './styles/global';
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import Routes from './routes/routes';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes />
        <GlobalStyle />
      </AuthProvider>
    </div>
  );
}

export default App;
