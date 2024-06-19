import React, { useRef } from 'react';
import Gallery from '../../components/CardGallery';

function TrainingPage() {
  const focusButtonRef = useRef(null);

  return (
    <React.Fragment>
      <Gallery focusButtonRef={focusButtonRef} />
    </React.Fragment>
  );
}

export { TrainingPage };
