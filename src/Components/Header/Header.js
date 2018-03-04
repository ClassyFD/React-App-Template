import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import axios from 'axios'
import './Header.css';

const ENV = require('../../frontenv');

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {
    const api = axios.create({
      withCredentials:true
    });
    api.get(ENV.REACT_APP_BACKEND+'/auth/me').then((response)=>{
        this.props.dispatch({
          type:'SET_USER',
          val:response.data
        })
    }).catch((error)=>{
      console.log(error);
    });
  }

  componentWillReceiveProps(props) {
    console.log(props)
  }
 

  render() {
    let props = this.props,
        login;
    if (props && props.user) {
      login = (
        <div className='header-right-section-login-container'>
          <Link className='header-right-section-login' to='/profile'>
            Profile
          </Link>
          <Link to='/edit' className='header-right-section-add-memes-li'/>
        </div>
      );
    } else {
      login = (
        <a href={ENV.REACT_APP_BACKEND + '/auth'} className='header-right-section-login'>
          Login
        </a>
      );
    }
    return (
      <main className='Header'>
        <section className='header-left-section'>
          <div className='header-left-section-featured-container'>
            <Link to='/' className='header-left-section-featured-text'>
              featured
            </Link>
            <div className='header-left-section-featured-image'/>
          </div>
          <Link to='/app/about' className='header-left-section-about-text'>
            about
          </Link>
          <a href='http://ifunnyoriginal.spreadshirt.com/' target='_blank' className='header-left-section-store-text'>
            store
          </a>
        </section>
        <section className='header-middle-section'>
          <Link to='/' className='header-middle-section-image'/>
        </section>
        <section className='header-right-section'>
          <div className='header-right-section-image'/>
          {login}
        </section>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.sessionUser
  }
}

export default connect(mapStateToProps)(Header);