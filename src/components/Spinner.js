import React, { Component } from 'react'
import loading2 from './loading2.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className='container text-center my-5 '>
        <img src={loading2} alt="loading" style={{width:'100px', height:'100px'}} />
      </div>
    )
  }
}
