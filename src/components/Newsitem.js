import React, { Component } from 'react'
import newsbanner from './newsbanner.jpg'
export class Newsitem extends Component {
 
  render() {
    let {title,description,imageurl,newsurl,author, date, sourceName}= this.props;
    return (
      <div className='my-5'>
        
       <div className="card">
        <img src={imageurl?imageurl:newsbanner} className="card-img-top" alt="this is an img" style={{width:"355px", height:"315px"}}/>
        <div className="card-body">
            <h5 className="card-title">{title} <span className="badge badge-success bg-success">{sourceName}</span></h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className='text-muted'>By {author?author:'Unknown'} on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-outline-dark btn-sm">Read More...</a>
        </div>
       </div>
      </div>
    )
  }
}

export default Newsitem
