import './sass/main.scss';
import Game from './classes/Game';
import ErrorBoundary from './classes/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <h1>Deal 'em!</h1>

        <Game />
      </ErrorBoundary>
    </div>
  );
}

export default App;
