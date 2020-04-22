import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import VoiceMailMessages from './components/VoiceMailMessages/VoiceMailContainer';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={VoiceMailMessages} />
    </Switch>
  </BrowserRouter>
);

export default App;
