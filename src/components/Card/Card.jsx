import { useState } from 'react';
import api from '../../services/api';
import Modal from '../Modal/Modal';
import {
  CardStyle,
  BookImg,
  BookInfo,
  BookTitle,
  BookAuthor,
  BookDetails,
  BookSpan,
  BoxInfo,
} from './styles';

const Card = (props) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [bookData, setBookData] = useState({ data: [] });

  const getBook = async (bookID) => {
    setmodalVisible(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await api.get('books/' + bookID, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      setBookData(data);
    } catch (error) {
      console.log('attempt to get book failed');
    };
  };

  return (
    <>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          onClose={() => setmodalVisible(false)}
          data={bookData}
         />
      )}

      <CardStyle key={props.bookID} onClick={() => getBook(props.bookID)}>
        <BookImg src={props.imageUrl} alt={props.id} />

        <BoxInfo>
          <BookInfo>
            <BookTitle>{props.title}</BookTitle>
            <BookAuthor>{props.authors}</BookAuthor>
          </BookInfo>
          <BookDetails>
            <BookSpan>{props.pageCount} páginas</BookSpan>
            <BookSpan>{props.publisher}</BookSpan>
            <BookSpan>Publicado em {props.published}</BookSpan>
          </BookDetails>
        </BoxInfo>
      </CardStyle>
    </>
  );
}

export default Card;
