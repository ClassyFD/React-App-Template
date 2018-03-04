import React, { Component } from 'react';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import { TimelineMax } from 'gsap';
import { StickyContainer, Sticky } from 'react-sticky-modified';
import Privacy from '../Privacy/Privacy';
import Terms from '../Terms/Terms';
import Memes from '../Memes/Memes';
import About from '../About/About';
import Search from '../Search/Search';
import Tags from '../Tags/Tags';
import MemeDetails from '../MemeDetails/MemeDetails';
import axios from 'axios';
import './Landing.css';

const ENV = require('../../frontenv');

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:'',
      tags:[]
    };
  }

  componentWillMount() {
    axios.get(ENV.REACT_APP_BACKEND+'/getTags').then((response)=>{
      this.setState({
        tags:response,
      })
    })
    let urlArr = [
      'https://ifunny.co/images/banner.en-1.png',
      'https://ifunny.co/images/banner.en-2.png',
      'https://ifunny.co/images/banner.en-3.png', 
      'https://ifunny.co/images/banner.en-4.png', 
      'https://ifunny.co/images/banner.en-5.png', 
      'https://ifunny.co/images/banner.en-6.png',
      'https://ifunny.co/images/banner.en-7.png', 
      'https://ifunny.co/images/banner.en-8.png', 
      'https://ifunny.co/images/banner.en-9.png', 
      'https://ifunny.co/images/banner.en-10.png',
      'https://ifunny.co/images/banner.en-11.png',
      'https://ifunny.co/images/banner.en-12.png', 
      'https://ifunny.co/images/banner.en-13.png', 
      'https://ifunny.co/images/banner.en-14.png', 
      'https://ifunny.co/images/banner.en-15.png'
    ]
    let rand = Math.floor(Math.random() * (14 - 0 + 1));
    this.setState({
      url:urlArr[rand]
    })
  }
  componentDidMount() {
  }

  componentWillReceiveProps(props) {
  }

  hoverLink(target) {
    let tl = new TimelineMax();
    tl.to(`.landing-right-section-app-bottom-${target}`, .3, {backgroundColor:'black'})
      .to(`.landing-${target==='left'?'app-store':target==='middle'?'google-play':'amazon'}-image`, .3, {opacity:1}, '-=.3')
      .to(`.landing-${target==='left'?'app-store':target==='middle'?'google-play':'amazon'}-text`, .3, {opacity:1}, '-=.3');
  }
  leaveLink(target) {
    let tl = new TimelineMax();
    tl.to(`.landing-right-section-app-bottom-${target}`, .3, {backgroundColor:'#080d11'})
      .to(`.landing-${target==='left'?'app-store':target==='middle'?'google-play':'amazon'}-image`, .3, {opacity:.5}, '-=.3')
      .to(`.landing-${target==='left'?'app-store':target==='middle'?'google-play':'amazon'}-text`, .3, {opacity:.5}, '-=.3');
  }
  
  render() {
    let trendingTags,
        state = this.state;
    if (state.tags) {
      trendingTags = state.tags.map((el)=>{
        return (
          <div className='landing-tranding-tags-el'>
            
          </div>
        )
      }) 
    }
    return (
      <StickyContainer className='Landing'>
        <div className='landing-main-container'>
          <section className='landing-left-section'>
            <Switch>
              <Route exact path={'/app'} component={Memes}/>
              <Route path={'/app/privacy'} component={Privacy}/>
              <Route path={'/app/terms'} component={Terms}/>
              <Route path={'/app/about'} component={About}/>
              <Route path={'/app/search'} component={Search}/>
              <Route path={'/app/tags/:tag'} component={Tags}/>
              <Route path={'/app/memes/:id'} component={MemeDetails}/>
              <Redirect from='*' to='/404' />
            </Switch>
          </section>
          <section className='landing-right-section'>
          <h1 className='landing-right-section-title'>
            daily dose of fun
          </h1> 
          <div className='landing-right-section-app-container'>
            <div className='landing-right-section-app-top'>
              <div style={{background:`url(${this.state.url})`, backgroundSize:'cover', height:'160px', width: '300px'}} className='landing-right-section-app-top-image'/>
            </div>
            <div className='landing-right-section-app-bottom'>
              <div onMouseLeave={(e)=>{this.leaveLink('left')}} onMouseEnter={(e)=>{this.hoverLink('left')}} className='landing-right-section-app-bottom-left'>
                <div className='landing-app-store-image'/>
                <h1 className='landing-app-store-text'>App Store</h1>
              </div>
              <div onMouseLeave={(e)=>{this.leaveLink('middle')}} onMouseEnter={(e)=>{this.hoverLink('middle')}} className='landing-right-section-app-bottom-middle'>
                <div className='landing-google-play-image'/>
                <h1 className='landing-google-play-text'>Google Play</h1>
              </div>
              <div onMouseLeave={(e)=>{this.leaveLink('right')}} onMouseEnter={(e)=>{this.hoverLink('right')}} className='landing-right-section-app-bottom-right'>
                <div className='landing-amazon-image'/>
                <h1 className='landing-amazon-text'>Amazon</h1>
              </div>
            </div>
          </div>
          <div className='landing-right-side-cam'/>
          <Sticky className='landing-right-side-sticky' topOffset={320} stickyStyle={{top:'80px'}}>
            <section className='landing-sticky-section'>
              <h1 className='landing-sticky-section-tags-title'>
                trending tags
              </h1>
              <div className='landing-sticky-section-tags'>
                {trendingTags}
              </div>
              <div className='landing-sticky-section-line'/>
              <h1 className='landing-sticky-section-follow-title'>
                follow iFunny
              </h1>
              <div className='landing-sticky-section-follow-buttons'>
                <div title="Like iFunny's Page on Facebook!" className='landing-sticky-section-facebook'/>
                <div title="Follow @iFunny on Twitter!" className='landing-sticky-section-twitter'/>
                <div title="Follow @iFunny on Instagram!"className='landing-sticky-section-instagram'/>
              </div>
              <div className='landing-sticky-section-chef'>
                <div className='landing-sticky-section-chef-logo'>
                  
                </div>
                <h1 className='landing-sticky-section-chef-title'>
                  iFunnyChef
                </h1>
              </div>
              <div className='landing-sticky-section-links'>
                <Link to='/app/privacy' className='landing-sticky-section-privacy'>
                  privacy
                </Link>
                <h1 className='landing-sticky-section-dot'>
                  •
                </h1>
                <Link to='/app/terms' className='landing-sticky-section-terms'>
                  terms
                </Link>
              </div>
              <h1 className='landing-sticky-section-copyright'>
                © iFunny 2018
              </h1>
            </section>
          </Sticky>
          {/* <Link to='/app/privacy'>Privacy</Link>
          <Link to='/app/terms'>Terms</Link>
          <Link to='/'>Memes</Link> */}
          </section>
        </div>
      </StickyContainer>
    )
  }
}

export default Landing;