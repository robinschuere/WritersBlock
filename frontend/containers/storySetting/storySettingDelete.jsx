import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeStorySetting } from '../../actions/storySetting';

import WithNavBar from '../../components/hoc/withNavBar';
import BackAndDeleteBar from '../../components/backAndDeleteBar';

const StorySettingDelete = ({
  computedMatch, storySettingStore, dispatch, i18n, mobile,
}) => {
  const [completed, setCompleted] = useState(false);
  const { storyId, storySettingId } = computedMatch.params;
  const storySetting = storySettingStore[storySettingId];

  const handleClose = () => {
    setCompleted(true);
  };

  const handleDelete = async () => {
    await removeStorySetting(storySetting, dispatch);
    setCompleted(true);
  };

  if (completed || !storySetting) {
    return <Redirect to={`/stories/${storyId}/storySettings`} />;
  }

  return (
    <Fragment>
      <BackAndDeleteBar mobile={mobile} onAccept={handleDelete} onClose={handleClose} i18n={i18n} />
      <div className="container-fluid">
        <h4>{i18n.t('storySetting.delete.header', { title: storySetting.name })}</h4>
        <p>{i18n.t('storySetting.delete.message')}</p>
      </div>
    </Fragment>
  );
};

StorySettingDelete.propTypes = {
  dispatch: PropTypes.func.isRequired,
  storySettingStore: PropTypes.object.isRequired,
  computedMatch: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  mobile: PropTypes.bool.isRequired,
};

export default WithNavBar(StorySettingDelete);
