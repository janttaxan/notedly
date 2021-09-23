import { Button } from 'components/common/Button/Button';

function App() {
  const apiUrl = process.env.REACT_APP_API || '';

  console.log('API_URL', apiUrl);
  return (
    <div className='App'>
      <Button />
    </div>
  );
}

export default App;
