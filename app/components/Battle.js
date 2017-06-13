import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link }from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

class PlayerInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }
  static defaultProps = {
    label: 'Username',
  }
  state = {
    username: ''
  }
  handleChange = (event) => {
    const value = event.target.value;

    this.setState(() => ({username: value}));
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { id, onSubmit } = this.props;
    onSubmit(id, this.state.username);
  }

  render() {
    const { username } = this.state;
    const { label } = this.state;

    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={username}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!username}>
            Submit
        </button>
      </form>
    );
  }

}

class Battle extends React.Component {
  state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
  }
  handleSubmit = (id, username) => {
    this.setState(() => ({
      [id + 'Name']: username,
      [id + 'Image'] : `https://github.com/${username}.png?size=200`
    }));
  }
  handleReset(id) {
    this.setState( () =>{
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    });
  }
  render () {
    const { match } = this.props;
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;

    return (
      <div>
        <div className='row'>
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />}

          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}>
                <button
                  className='reset'
                  onClick={this.handleReset.bind(null, 'playerOne')}>
                  Reset
                </button>
            </PlayerPreview>
          }

          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />}

          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}>
                <button
                  className='reset'
                  onClick={this.handleReset.bind(null, 'playerTwo')}>
                  Reset
                </button>
            </PlayerPreview>
          }
        </div>

        {playerOneImage && playerTwoImage &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: '?playerOneName=' + playerOneName + '&playerTwoName=' +
              playerTwoName
            }}>
              Battle
          </Link>}
      </div>
    );
  }
}

export default Battle;