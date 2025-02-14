import React, { useRef } from 'react';
import Gallery from '../../components/CardGallery';
// import { useSelector, useDispatch } from 'react-redux';
// import { WordTable } from '../../components/WordTable';
// import { AddWord } from '../../components/AddWordButton';
// import { fetchWords } from '../../../../store/slice/wordSlice';

function HomePage() {
  // const dispatch = useDispatch();
  // const { loading, error } = useSelector((state) => state.word);

  const focusButtonRef = useRef(null);
  // useEffect(() => {
  //   dispatch(fetchWords());
  // }, [dispatch]);

  // if (loading) return <h2>Loading...</h2>;
  // if (error) return <h2>{error}</h2>;

  return (
    <React.Fragment>
      {/* <AddWord/>
      <WordTable /> */}

      <Gallery focusButtonRef={focusButtonRef} />
    </React.Fragment>
    );
}

export { HomePage };
