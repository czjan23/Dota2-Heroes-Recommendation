import React from 'react';
import { DropTarget } from 'react-drag-drop-container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Item from './Item';
import Progress from './Progress';
import './Cart.css';

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teammates: [],
      opponents: [],
      results: [],
      warning: '',
      isWaitng: false
    };
  }

  canDrop = (hero) => {
    for (let teammate of this.state.teammates) {
      if (teammate.id === hero.id) {
        return false;
      }
    }
    for (let opponent of this.state.opponents) {
      if (opponent.id === hero.id) {
        return false;
      }
    }
    return true;
  };

  handleDrop1 = (e) => {
    let hero = e.dragData.hero;
    if (!this.canDrop(hero) || this.state.teammates.length === 4) {
      return;
    }
    let teammates = this.state.teammates;
    teammates.push(hero);
    this.setState({teammates: teammates});
    console.log(hero);
  };

  handleDrop2 = (e) => {
    let hero = e.dragData.hero;
    if (!this.canDrop(hero) || this.state.opponents.length === 5) {
      return;
    }
    let opponents = this.state.opponents;
    opponents.push(e.dragData.hero);
    this.setState({opponents: opponents});
    console.log(e.dragData);
  };

  handleClick = (model, e) => {
    if (this.state.teammates.length !== 4 || this.state.opponents.length !== 5) {
      this.setState({warning: 'You have to select 4 teammates and 5 opponents...', results: []});
      return;
    } else {
      this.setState({warning: '', results: [], isWaitng: true});
    }
    let header = 'http://localhost:3001/results?';
    // let header = window.location.href + 'results?';
    let tail = '';
    for (let i = 0; i < this.state.teammates.length; i++) {
      tail += 'team' + i + '=' + this.state.teammates[i].id + '&';
    }
    for (let i = 0; i < this.state.opponents.length; i++) {
      tail += 'oppo' + i + '=' + this.state.opponents[i].id + '&';
    }
    tail += 'model=' + model + '&';
    let url = header + tail;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({results: res, isWaitng: false});
      });
  };

  handleDelete = (id) => {
    let teammates = this.state.teammates;
    let idx = -1;
    for (let i = 0; i < teammates.length; i++) {
      if (teammates[i].id === id) {
        idx = i;
        break;
      }
    }
    if (idx !== -1) {
      teammates.splice(idx, 1);
      this.setState({teammates: teammates});
      return;
    }
    let opponents = this.state.opponents;
    for (let i = 0; i < opponents.length; i++) {
      if (opponents[i].id === id) {
        idx = i;
        break;
      }
    }
    opponents.splice(idx, 1);
    this.setState({opponents: opponents});
  };

  render() {
    return (
      <div id="cart-body">
          <DropTarget
            targetKey="zhe"
            onHit={this.handleDrop1}
          >
          <Paper className="paper cart">
            <Typography variant="h4">
              Teammates
            </Typography>
            <div className="center">
              <Typography variant="h5">
                {this.state.teammates.length > 0 ? '' : 'Drag your teammates here...'}
              </Typography>
              {this.state.teammates.map((hero) => {
                return (
                  <Item key={hero.id} hero={hero} clickHandler={this.handleDelete.bind(this)} />
                )
              })}
            </div>
            </Paper>
          </DropTarget>

          <DropTarget
            targetKey="zhe"
            onHit={this.handleDrop2}
          >
          <Paper className="paper cart">
            <Typography variant="h4">
              Opponents
            </Typography>
            <div className="center">
              <Typography variant="h5">
                {this.state.opponents.length > 0 ? '' : 'Drag your opponents here...'}
              </Typography>
              {this.state.opponents.map((hero) => {
                return (
                  <Item key={hero.id} hero={hero} clickHandler={this.handleDelete.bind(this)} />
                )
              })}
            </div>
          </Paper>
          </DropTarget>

        <Paper className="paper">
          <Button size="large" variant="contained" color="primary" onClick={this.handleClick.bind(this, 'softmax')}>
            Softmax
          </Button>
          <Button size="large" variant="contained" color="primary" style={{marginLeft: '5px'}} onClick={this.handleClick.bind(this, 'sigmoid')}>
            Sigmoid
          </Button>
          <div className="center">
          {this.state.isWaitng ? 
            <Progress />
            :
            <div>
              <Typography variant="h5">
                {this.state.results.length > 0 ? '' : this.state.warning.length > 0 ? this.state.warning : 'Your recommendations will be here...'}
              </Typography>
              {this.state.results.map((id) => {
                return (
                  <img className="result-img" alt='hero_img' key={id} src={require('../../public/hero_img/' + id + '.png')} />
                )
              })}
            </div>
          }
          </div>
        </Paper>
      </div>
    );
  }
}
