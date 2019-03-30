import React from 'react';
import Hero from './Hero';
import Cart from './Cart';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './Body.css';

export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroes: []
    };
  }

  componentWillMount() {
    this.getHeroes();
  }

  getHeroes() {
    let url = 'http://localhost:3001/heroes';
    fetch(url)
      .then(res => res.json())
      .then(res => {
        let heroes = res.heroes;
        this.setState({heroes: heroes});
      });
  }

  render() {
    let agi_heroes = [];
    let str_heroes = [];
    let int_heroes = [];
    this.state.heroes.forEach((hero) => {
      if (hero.primary_attr === 'agi') {
        agi_heroes.push(<Hero key={hero.id} hero={hero}/>);
      } else if (hero.primary_attr === 'str') {
        str_heroes.push(<Hero key={hero.id} hero={hero}/>);
      } else {
        int_heroes.push(<Hero key={hero.id} hero={hero}/>);
      }
    });

    return (
      <div id="body">
        <Grid container spacing={24}>
          <Grid item xs={6}>
              <Paper>
                <Typography variant="h5" className="label">
                  <img alt='str_img' src={require('../ability_img/strength.png')}/>
                  Strength
                </Typography>
                {str_heroes}
              </Paper>
              <Paper>
                <Typography variant="h5" className="label">
                  <img alt='agi_img' src={require('../ability_img/agility.png')}/>
                  Agility
                </Typography>
                {agi_heroes}
              </Paper>
              <Paper>
                <Typography variant="h5" className="label">
                  <img alt='int_img' src={require('../ability_img/intelligence.png')}/>
                  Intelligence
                </Typography>
                {int_heroes}
              </Paper>
          </Grid>

          <Grid item xs={6}>
            <Cart />
          </Grid>
        </Grid>
      </div>
    )
  }
}
