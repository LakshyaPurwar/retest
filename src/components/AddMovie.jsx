import React, { useRef } from 'react';

import classes from './AddMovie.module.css';

function AddMovie(props) {
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    titleRef.current.value = '';
    openingTextRef.current.value = '';
    releaseDateRef.current.value = ''

    props.onAddMovie(movie);
  }

  //What we also learn is controlled form input with useRef
  //For every field in the form , a useRef is created
  //In the field , there is a ref  attribute added with value equal to the useRef constant.
  //Now , the useRef tracks the input on its own.
  //When we want to acces the value , we use titleRef.current.value
  //There is two way binding , changing value of the variable  , changes the state of the input field.

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
