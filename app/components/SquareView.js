import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, StyleSheet } from 'react-native';

class SquareView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      direction: 'column', // 'column' and 'row'
    };
  }

  render() {
    const square = (
      <View
        {...this.props}
        style={[this.props.style, { width: this.state.width, height: this.state.height }]}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          const sideLength = Math.max(width, height);

          if (sideLength) {
            this.setState({ width: sideLength, height: sideLength });
          } else {
            this.setState({ direction: 'column' });
          }
        }}
      >
        {this.props.children}
      </View>
    );

    switch (this.state.direction) {
      case 'column':
        return square;
      case 'row':
// eslint-disable-next-line react-native/no-inline-styles,react-native/no-color-literals
        return (<View style={{ backgroundColor: 'transparent' }}>{square}</View>);
      default:
        return null;
    }
  }
}

SquareView.propTypes = {
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style,
};

const styles = StyleSheet.create({
});

SquareView.defaultProps = {
  style: styles,
};

export default SquareView;
