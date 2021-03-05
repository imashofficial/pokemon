import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import configureStore from './app/utils/configStore';
import { Store } from 'redux';
import MainApp from './app/Main';

interface Props {
}

interface State {
  store: Store<any, any>
}

class PokemonApp extends React.Component<Props, State> {

  async componentWillMount() {
    configureStore(store => {
        this.setState({
            store
        });
    });
  }

  render(){
    const { store } = this.state;
    if (store === null) {
      return <div>Loading...</div>;
    }
    return (
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
  }
}

export default PokemonApp;
