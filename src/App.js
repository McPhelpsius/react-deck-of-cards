import './sass/main.scss';
import Game from './classes/Game';
import ErrorBoundary from './classes/ErrorBoundary';


function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <h1>Deal 'em!</h1>
        <Game />
      </div>
    </ErrorBoundary>
  );
}

export default App;
