/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { Context } from '../../contexts/AuthContext/AuthContext';
import api from '../../services/api';
import getTokenApi from '../../utils/getToken';
import { Card } from '../../components';

import {
  CardsBox,
  Container,
  LogoutContainer,
  LogoutIcon,
  LogoContainer,
  Logo,
  Header,
  Welcome,
  WelcomeContainer,
  ButtonLeft,
  ButtonRight,
  Button,
  ButtonContainer,
  Pagination,
} from './styles';

const Home = () => {
  const { logout } = useContext(Context);
  const [booksData, setBooksData] = useState({ data: [] });
  const [pageLength, setPageLenght] = useState(0);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState('');

  useEffect(() => {
    (async () => {
      const responseToken = await getToken();
      await getBooks(responseToken);
      setUser(JSON.parse(localStorage.getItem('name')));
    })();
  }, []);

  const getToken = async () => {
    try {
      return await getTokenApi();
    } catch (err) {
      logout();
    }
  };

  const getBooks = async (responseToken) => {
    try {
      const { data } = await api.get('books', {
        headers: {
          Authorization: `Bearer ${JSON.parse(responseToken.token)}`,
        },
        params: {
          page,
          amount: 12,
        },
      });
      setPageLenght(Math.ceil(data.totalPages));
      setBooksData(data);
    } catch (err) {
      logout();
    }
  };

  const prevPage = () => {
    if (page - 1 > 0) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page + 1 <= pageLength) {
      setPage(page + 1);
    }
  };

  useEffect(async () => {
    const responseToken = await getToken();
    await getBooks(responseToken);
  }, [page]);

  return (
    <Container>
      <Header>
        <LogoContainer>
          <Logo />
          <span>Books</span>
        </LogoContainer>

        <WelcomeContainer>
          <Welcome>
            Bem vindo, <strong>{user}!</strong>
          </Welcome>
          <LogoutContainer onClick={logout}>
            <LogoutIcon />
          </LogoutContainer>
        </WelcomeContainer>
      </Header>

      <CardsBox>
        {booksData.data.map((book) => (
          <Card
            key={book.id}
            imageUrl={book.imageUrl}
            title={book.title}
            authors={book.authors}
            pageCount={book.pageCount}
            publisher={book.publisher}
            published={book.published}
            bookID={book.id}
          />
        ))}
      </CardsBox>

      <ButtonContainer>
        <Pagination>
          Página <strong>{page}</strong> de <strong>{pageLength}</strong>
        </Pagination>
        <Button>
          <ButtonLeft
            disabled={!booksData || booksData.currentPage <= 1}
            onClick={prevPage}
          />
        </Button>
        <Button>
          <ButtonRight
            disabled={
              !booksData || booksData.currentPage >= booksData.totalPages
            }
            onClick={nextPage}
          />
        </Button>
      </ButtonContainer>
    </Container>
  );
}

export default Home;
