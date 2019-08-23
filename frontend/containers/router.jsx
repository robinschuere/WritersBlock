import React, { useState, useEffect } from 'react';
import { Switch, HashRouter } from 'react-router-dom';

import reducers from '../reducers';

import Home from './home';
import NotFound from './notFound';
import About from './about';
import Version from './version';
import Contact from './contact';
import Login from './user/login';
import Register from './user/register';
import Stories from './story/stories';
import StoryBoard from './story/storyBoard';
import StoryDelete from './story/storyDelete';
import StoryEdit from './story/storyEdit';
import Chapters from './chapter/chapters';
import ChapterEdit from './chapter/chapterEdit';
import ChapterDelete from './chapter/chapterDelete';
import ChapterView from './chapter/chapterView';
import Characters from './character/characters';
import CharacterEdit from './character/characterEdit';
import CharacterDelete from './character/characterDelete';
import CharacterView from './character/characterView';
import Places from './place/places';
import PlaceEdit from './place/placeEdit';
import PlaceDelete from './place/placeDelete';
import PlaceView from './place/placeView';
import Items from './item/items';
import ItemEdit from './item/itemEdit';
import ItemDelete from './item/itemDelete';
import ItemView from './item/itemView';
import StorySettings from './storySetting/storySettings';
import StorySettingEdit from './storySetting/storySettingEdit';
import StorySettingDelete from './storySetting/storySettingDelete';
import StorySettingView from './storySetting/storySettingView';
import Logout from './user/logout';
import UserView from './user/userView';
import UserEdit from './user/userEdit';
import UserDelete from './user/userDelete';
import PasswordChange from './user/passwordChange';
import EventEdit from './event/eventEdit';
import EventDelete from './event/eventDelete';
import RelationEdit from './relation/relationEdit';
import RelationDelete from './relation/relationDelete';
import Import from './story/import';

import i18n from '../i18n';
import PrivateRoute from '../components/privateRoute';
import PublicRoute from '../components/publicRoute';
import { exportStoryToJson, readFileAsync, importStoryFromJson } from '../helpers/exportImport';
import { loginPersistentUser } from '../actions/user';

const Router = () => {
  const [language, setLanguage] = useState(i18n.language);
  const { stores, dispatch } = reducers();

  const checkPersistentUser = async () => {
    await loginPersistentUser(dispatch);
  };

  useEffect(() => {
    checkPersistentUser();
  });

  const handleChangeLanguage = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  if (!!stores.userStore.loggedInUser && stores.userStore.loggedInUser.language !== language) {
    handleChangeLanguage(stores.userStore.loggedInUser.language);
  }

  const props = {
    stores,
    dispatch,
    language,
    i18n,
    changeLanguage: handleChangeLanguage,
  };

  const handleImportFromJSON = async (path) => {
    const data = await readFileAsync(path);

    await importStoryFromJson(JSON.parse(data), stores, dispatch);
  };

  const handleExportToJSON = (item) => {
    const data = exportStoryToJson(item.id, stores);
    const element = document.createElement('a');
    element.style.display = 'none';
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(data)}`);
    const fileName = stores.storyStore[item.id].title.toLowerCase().replace(/[^a-zA-Z]/g, '_');
    element.setAttribute('download', `${fileName}.wbson`);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <HashRouter key={`writersblock_${language}`}>
      <Switch>
        <PublicRoute exact path="/" component={Home} {...props} />
        <PublicRoute path="/about" component={About} {...props} />
        <PublicRoute path="/contact" component={Contact} {...props} />
        <PublicRoute path="/version" component={Version} {...props} />
        <PublicRoute path="/login" component={Login} {...props} />
        <PublicRoute path="/register" component={Register} {...props} />

        <PrivateRoute path="/import" component={Import} {...props} importFromJson={handleImportFromJSON} />
        <PrivateRoute path="/user/edit" component={UserEdit} {...props} />
        <PrivateRoute path="/user/changepassword" component={PasswordChange} {...props} />
        <PrivateRoute path="/user/delete" component={UserDelete} {...props} />
        <PrivateRoute path="/user" component={UserView} {...props} />
        <PrivateRoute path="/stories/new" component={StoryEdit} {...props} />

        <PrivateRoute path="/stories/:storyId/:storyRoute/:parentId/events/new" component={EventEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/:storyRoute/:parentId/events/:eventId/delete" component={EventDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/:storyRoute/:parentId/events/:eventId" component={EventEdit} {...props} />

        <PrivateRoute path="/stories/:storyId/chapters/new" component={ChapterEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/chapters/:chapterId/edit" component={ChapterEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/chapters/:chapterId/delete" component={ChapterDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/chapters/:chapterId" component={ChapterView} {...props} />
        <PrivateRoute path="/stories/:storyId/chapters" component={Chapters} {...props} />

        <PrivateRoute path="/stories/:storyId/characters/:characterId/relations/new" component={RelationEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/characters/:characterId/relations/:relationId/delete" component={RelationDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/characters/:characterId/relations/:relationId" component={RelationEdit} {...props} />

        <PrivateRoute path="/stories/:storyId/characters/new" component={CharacterEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/characters/:characterId/edit" component={CharacterEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/characters/:characterId/delete" component={CharacterDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/characters/:characterId" component={CharacterView} {...props} />
        <PrivateRoute path="/stories/:storyId/characters" component={Characters} {...props} />

        <PrivateRoute path="/stories/:storyId/places/new" component={PlaceEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/places/:placeId/edit" component={PlaceEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/places/:placeId/delete" component={PlaceDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/places/:placeId" component={PlaceView} {...props} />
        <PrivateRoute path="/stories/:storyId/places" component={Places} {...props} />

        <PrivateRoute path="/stories/:storyId/items/new" component={ItemEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/items/:itemId/edit" component={ItemEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/items/:itemId/delete" component={ItemDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/items/:itemId" component={ItemView} {...props} />
        <PrivateRoute path="/stories/:storyId/items" component={Items} {...props} />

        <PrivateRoute path="/stories/:storyId/storySettings/new" component={StorySettingEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/storySettings/:storySettingId/edit" component={StorySettingEdit} {...props} />
        <PrivateRoute path="/stories/:storyId/storySettings/:storySettingId/delete" component={StorySettingDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/storySettings/:storySettingId" component={StorySettingView} {...props} />
        <PrivateRoute path="/stories/:storyId/storySettings" component={StorySettings} {...props} />

        <PrivateRoute path="/stories/:storyId/delete" component={StoryDelete} {...props} />
        <PrivateRoute path="/stories/:storyId/edit" component={StoryEdit} {...props} />
        <PrivateRoute path="/stories/:storyId" component={StoryBoard} {...props} />
        <PrivateRoute path="/stories" exportToJSON={handleExportToJSON} component={Stories} {...props} />
        <PrivateRoute path="/logout" component={Logout} {...props} />

        <PublicRoute path="*" component={NotFound} {...props} />
      </Switch>
    </HashRouter>
  );
};

export default Router;
