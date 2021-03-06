import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getCharacterById } from '../../reducers/characterReducer';
import { updateCharacter, getCharacters } from '../../pouch/character';
import { saveCharacter, pushCharacters } from '../../actions/characterActions';
import CharacterBasic from '../characterComponents/characterBasic';
import CharacterAttributeList from '../characterComponents/characterAttributeList';
import CharacterDetail from '../characterComponents/characterDetail';
import { newCharacterBasicAttribute } from '../../constants';

class CharacterDetailContainer extends React.Component {
  componentDidMount() {
    if (!this.props.charactersLoaded) {
      this.props.getCharacters();
    }
  }

  render() {
    return (
      <CharacterDetail
        character={this.props.character} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    character: getCharacterById(state.characters, ownProps.match.params.id),
    charactersLoaded: state.pouchState.charactersLoaded
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCharacters: () => {
      getCharacters()
        .then((result) => {
          dispatch(pushCharacters(result));
        });
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterDetailContainer);
