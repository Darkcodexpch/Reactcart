import Home from './Components/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FeedbackProvider } from './Context/FeedbackContext'



function App() {
  return (
    <FeedbackProvider>
    <Home/>
    </FeedbackProvider>
  );
}

export default App;
