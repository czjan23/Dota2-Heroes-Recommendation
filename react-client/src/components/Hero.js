import React from 'react';
import { DragDropContainer } from 'react-drag-drop-container';
import './Hero.css';

export default class Hero extends React.Component {
  render() {
    return (
      <div className="hero">
        <DragDropContainer
          targetKey="zhe"
          dragData={{hero: this.props.hero}}
          onDrop={(e)=>(console.log(e))}
        >
          <img className="img" alt={this.props.hero.localized_name} src={require('../../public/hero_img/' + this.props.hero.id + '.png')}/>
        </DragDropContainer>
      </div>
    );
  }
}
