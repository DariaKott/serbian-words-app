import React, { useRef } from 'react';
import Gallery from '../../components/CardGallery';


function HomePage() {

  const focusButtonRef = useRef(null);


  return (
    <React.Fragment>
      <Gallery focusButtonRef={focusButtonRef} />
    </React.Fragment>
    );
}

export { HomePage };
