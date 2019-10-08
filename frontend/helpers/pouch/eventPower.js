import modelBuilder from './modelBuilder';
import { constants } from '../../constants';

const values = modelBuilder(constants.eventPowerDb);

const getAllByStoryId = storyId => values.getAll()
  .then(rows => rows.filter(r => r.storyId === storyId));

export default {
  ...values,
  getAll: getAllByStoryId,
  getAllByStoryId,
};
