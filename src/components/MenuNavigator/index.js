import React from "react";
import { connect } from "react-redux";




class MenuNavigator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillReceiveProps(nextProps){
    console.log('SUPER NAVIGATION ACTIVATED 🚀🚀')
    if(nextProps.state.screen) {
      console.log('SUPER NAVIGATION ACTIVATED 🚀🚀', nextProps.state.screen)
      this.props.navigation.navigate(nextProps.state.screen)
    }
  }

  render() { 
  }
}

/* ===============================================================
  ======================= REDUX CONNECTION =======================
  ================================================================ */

const mapStateToProps = state => {
  return {
    state: state.menu
  };
};

const componentContainer = connect(
  mapStateToProps
)(MenuNavigator);

export default componentContainer;
