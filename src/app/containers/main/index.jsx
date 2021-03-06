import React from 'react'

import './styles.sass'

class MainContainer extends React.Component {
  render() {
    return (
      <div>
        <form className='box' method='post' action='' encType='multipart/form-data'>
          <div className='box__input'>
            <input className='box__file' type='file' name='file' id='file' />
            <label htmlFor='file'><strong>Choose a file</strong><span className='box__dragndrop'> or drag it here</span>.</label>
            <button className='box__button' type='submit'>Upload</button>
          </div>
          <div className='box__uploading'>Uploading&hellip;</div>
          <div className='box__success'>Done!</div>
          <div className='box__error'>Error! <span></span>.</div>
        </form>
      </div>
    )
  }
}

export default MainContainer
