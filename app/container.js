import React from 'react';
import { connect } from 'react-redux';

//components
import AppContainer from './components/containers/appContainer';
import NavBarContainer from './components/containers/navBarContainer';
import CharactersContainer from './components/containers/charactersContainer';
import RegisterContainer from './components/containers/registerContainer';
import CharacterDetailContainer from './components/containers/characterDetailContainer';
import CharacterBasicContainer from './components/containers/characterBasicContainer';
import CharacterAttributesContainer from './components/containers/characterAttributesContainer';
import NotFoundContainer from './components/containers/notFoundContainer';
import DestroyContainer from './components/containers/destroyContainer';
import FooterContainer from './components/containers/footerContainer';
import ContactContainer from './components/containers/contactContainer';

//Routing
import { Route, Switch, HashRouter } from 'react-router-dom';

class Container extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <NavBarContainer />
          <div className="page-header">
            <h1>Writers Block <small>~ The app for building better stories ~</small></h1>
          </div>
          <Switch>
            <Route exact path="/" component={AppContainer} />
            {this.props.loggedin && <Route path="/erase" component={DestroyContainer} />}
            {this.props.loggedin && <Route path="/character/:id/attributes" component={CharacterAttributesContainer} />}
            {this.props.loggedin && <Route path="/character/:id/basic" component={CharacterBasicContainer} />}
            {this.props.loggedin && <Route path="/character/:id" component={CharacterDetailContainer} />}
            {this.props.loggedin && <Route path="/character" component={CharactersContainer} />}
            {this.props.loggedin && <Route path="/contact" component={ContactContainer} />}
            {!this.props.loggedin && <Route path="/register" component={RegisterContainer} />}
            <Route path="*" component={NotFoundContainer} />
          </Switch>
          <FooterContainer />
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedin: state.pouchState.userLoggedIn
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container)