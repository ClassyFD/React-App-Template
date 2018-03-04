import React, { Component } from 'react';
import './MemeDetails.css';
import axios from 'axios';
const ENV = require('../../frontenv');
class MemeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentPage:1,
      memeDetails:''
    };
  }

  componentDidMount() {
    axios.get(ENV.REACT_APP_BACKEND+'/api/getMemeDetails/'+this.props.match.params.id + '?commentPage='+this.state.commentPage).then((response)=>{
      this.setState({
        memeDetails:response.data
      })
    });
  }

  componentWillReceiveProps(props) {
  }

  render() {
    let match = this.props.match,
        props = this.props,
        state = this.state,
        image,
        caption,
        details,
        comments;
        console.log(state)
        if (state.memeDetails && state.memeDetails.details) {
          if (state.memeDetails.details.picture) {
            image = (
              <img src={state.memeDetails.details.picture} style={{width:'500px', height:'auto'}} className='meme-details-image-section-image'/>
            )
          }
          if (state.memeDetails.details.caption) {
            caption = (
              <div className='meme-details-caption'>
                {state.memeDetails.details.caption}
              </div>
            )
          }
          if (state.memeDetails.details && state.memeDetails.details.username) {
            details = (
              <section className='-section'>
                <div className=''>
                  <div className=''>
                    tags
                  </div>
                  <div className=''>
                    {state.memeDetails.details.username}
                  </div>
                  <div className=''>
                    social media
                  </div>
                </div>
                <div className=''>
                  <div className=''>
                    <div className=''>
                      likes
                    </div>
                    <div className=''>
                      comments
                    </div>
                  </div>
                  <div className=''>
                    arrows
                  </div>
                </div>
              </section>
            )
          }
        }
        
    return (
      <main className='MemeDetails'>
        <section className='meme-details-image-section'>
          {image}
        </section>
        <section className='meme-details-caption-section'>
          {caption}
        </section>
        <section className='meme-details-meme-details-section'>
          {details}
        </section>
        <section className='meme-details-meme-comments-section'>
          
        </section>
      </main>
    )
  }
}

export default MemeDetails;