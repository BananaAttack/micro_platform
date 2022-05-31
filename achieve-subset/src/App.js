// import logo from './logo.svg';
import './App.css';
// import { HashRouter} from 'react-router-dom'
// import { renderRoutes }  from 'react-router-config';
// import routes from './config/routes';
import React from 'react';

// function App() {
//   // console.log(this.props);
//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//           <HashRouter>
//       {/* <Provider {...stores}>{renderRoutes(routes)}</Provider> */}
//       <div>hello</div>
//       <div> {renderRoutes(routes)}</div>
//     </HashRouter>
//     </div>
//   );
// }

// export default App;


export default class Root extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    console.log(this.props)
    return (
      <div>test</div>
    );
  }
}
// const Root = (props) => {
//   console.log(props);
//   return (
//     <>
//     hello
//     </>
//   );
// };

// export default Root;
