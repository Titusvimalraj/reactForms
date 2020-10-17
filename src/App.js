import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import NavBar from './components/NavBar/NavBar';
import SideDrawer from './components/SideDrawer/SideDrawer';


function App() {
  const anchor = 'left';
  const [sidemenu, setSideMenu] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSideMenu({ ...sidemenu, [anchor]: open });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar toggleDrawer={toggleDrawer} anchor={anchor} />
        <SideDrawer showSideMenu={sidemenu} anchor={anchor} toggleDrawer={toggleDrawer} />
        <Switch>
          <Route key={'a-form'} path="/form/:id" component={Form} />
          <Route key={'new-form'} path="/form" component={Form} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect from="/" to="/form" />
          <Route render={() => <h1>Not found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
