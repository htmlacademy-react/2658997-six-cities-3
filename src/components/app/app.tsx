import MainScreen from '../../pages/main-screen/main-screen.tsx';

type AppCount = {
  count: number;
}

function App({count}: AppCount): JSX.Element {
  return (
    <MainScreen count={count}/>
  );
}

export default App;
