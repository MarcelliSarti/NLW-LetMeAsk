import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './Pages/Home';
import { NewRoom } from './Pages/NewRoom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './Pages/Room';
import { AdminRoom } from './Pages/AdminRoom';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          {/* tudo que vier depois do / será atribuído ao id na página room  */}
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch> {/* não deixará que haja confunda entre 2 rotas com nome parecido*/}
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;