import React, { Component } from 'react';
import './style.scss';
// import { Spring } from 'react-spring';
import { VelocityComponent } from 'velocity-react';

class Block extends Component {
  state = {
    isVisible: false
  };

  componentDidMount() {
    console.log('block is now visible');
    this.setState({ isVisible: !this.state.isVisible });
  }

  componentWillUnmount() {
    console.log('will unmount');
  }

  render() {
    let bonusScore;
    if (this.props.bonusScore) {
      bonusScore = <h4>Bonus {this.props.bonusScore}</h4>;
    }

    if (this.props.index === 0) {
      return (
        <div
          className="block block-bottom"
          style={{ background: this.props.color }}
        >
          {this.props.image}
          <div className="inner-text">
            {this.props.keyDown}
            {bonusScore}
          </div>
        </div>
        // <VelocityComponent
        //   animation={{ opacity: this.state.isVisible ? 1 : 0 }}
        //   enter={{ animation: 'fadeIn' }}
        //   runAnimation={true}
        //   duration={500}
        // >
        //   <div
        //     className="block block-bottom"
        //     style={{ background: this.props.color }}
        //   >
        //     {this.props.image}
        //     <div className="inner-text">
        //       {this.props.keyDown}
        //       {bonusScore}
        //     </div>
        //   </div>
        // </VelocityComponent>
      );
    } else {
      return (
        <div className="block" style={{ background: this.props.color }}>
          {this.props.image}
          <div className="inner-text">
            {this.props.keyDown}
            {bonusScore}
          </div>
        </div>

        // <VelocityComponent
        //   animation={{ opacity: this.state.isVisible ? 1 : 0 }}
        //   enter={{ animation: 'fadeIn' }}
        //   runAnimation={true}
        //   duration={500}
        // >
        //   <div className="block" style={{ background: this.props.color }}>
        //     {this.props.image}
        //     <div className="block-bottom-text">
        //       {this.props.keyDown}
        //       {bonusScore}
        //     </div>
        //   </div>
        // </VelocityComponent>
      );
    }
  }
}

export default Block;
