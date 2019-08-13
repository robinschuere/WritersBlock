import { getChaptersByStory } from '../reducers/chapter';
import { getCharactersByStory } from '../reducers/character';
import { getItemsByStory } from '../reducers/item';
import { getEventsByStory } from '../reducers/event';
import { getRelationsByStory } from '../reducers/relation';
import { getStorySettingsByStory } from '../reducers/storySetting';
import { importStory } from '../actions/story';
import { importCharacter } from '../actions/character';
import { importChapter } from '../actions/chapter';
import { importItem } from '../actions/item';
import { importStorySetting } from '../actions/storySetting';
import { importEvent } from '../actions/event';
import { importRelation } from '../actions/relation';

export const exportStoryToJson = (storyId, stores) => {
  const exportData = {
    story: stores.storyStore[storyId],
    chapters: getChaptersByStory(stores.chapterStore, storyId),
    characters: getCharactersByStory(stores.characterStore, storyId),
    items: getItemsByStory(stores.itemStore, storyId),
    events: getEventsByStory(stores.eventStore, storyId),
    relations: getRelationsByStory(stores.relationStore, storyId),
    storySettings: getStorySettingsByStory(stores.storySettingStore, storyId),
  };

  return JSON.stringify(exportData);
};

export const importStoryFromJson = async (data, stores, dispatch) => {
  const {
    story, chapters, characters, items, storySettings, events, relations,
  } = data;
  const userId = stores.userStore.loggedInUser.id;
  const updatedStory = { ...story, userId };
  await importStory(updatedStory, dispatch);
  await Promise.all(storySettings.map(c => importStorySetting(c, dispatch)));
  await Promise.all(characters.map(c => importCharacter(c, dispatch)));
  await Promise.all(chapters.map(c => importChapter(c, dispatch)));
  await Promise.all(items.map(c => importItem(c, dispatch)));
  await Promise.all(events.map(c => importEvent(c, dispatch)));
  await Promise.all(relations.map(c => importRelation(c, dispatch)));
};

export const readFileAsync = path => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = () => {
    resolve(reader.result);
  };

  reader.onerror = reject;

  reader.readAsText(path);
});
