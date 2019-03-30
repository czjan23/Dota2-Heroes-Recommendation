import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import './Item.css';

export default class Item extends React.Component {
    click() {
      this.props.clickHandler(this.props.hero.id);
    }

    render() {
      return (
        <div className="item">
          <img className="item-img" alt={this.props.hero.localized_name} src={require('../../public/hero_img/' + this.props.hero.id + '.png')}/>
          <Button color="secondary" onClick={this.click.bind(this)}>
            <DeleteForeverOutlinedIcon />
          </Button>
        </div>
      );
    }
  }
