import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import singleSpaReact from "single-spa-react";
import Root from './App';
// import reportWebVitals from './reportWebVitals';


// 
const domElementGetter = () => {
  let el = document.getElementById("react");

  if (!el) {
    el = document.createElement('div');
    el.id = 'micro-content';
    document.body.appendChild(el);
  }
  console.log("child now");
  console.log(el);
  return el;
}
//这里root挂载的节点在父应用,将子应用的root节点名和父应用名字一致即可
// if (process.env.NODE_ENV === 'development') {
//   // ReactDOM.render(
//   //   <React.StrictMode>
//   //     <Root />
//   //   </React.StrictMode>,
//   //   document.getElementById('react')
//   // );
//   const root = ReactDOM.createRoot(document.getElementById('react'));
// root.render(
//   <React.StrictMode>
//     <Root {...props} test2={"test2"} />
//   </React.StrictMode>
// );
// }

// console.log("check");
// console.log(this);
const root = ReactDOM.createRoot(document.getElementById('react'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);


const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  domElementGetter,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return null;
  },
});
export function bootstrap(props) {
  return lifecycles.bootstrap(props);
}

export function mount(props) {
  return lifecycles.mount(props);
}

export function unmount(props) {
  return lifecycles.unmount(props);
}

// const root = ReactDOM.createRoot(document.getElementById('react'));
// root.render(
//   <React.StrictMode>
//     {/* <Root /> */}
//     {lifecycles.loadRootComponent()}
//   </React.StrictMode>
// );

// const bootstrap = (props) => {
//   console.log('bootstrp', props.styleTag)
//   // diffSandbox.active();
//   return lifecycles.bootstrap(props);
// }

// const mount = (props) => {
//   console.log('mount', props.styleTag)
//   // const styleLabel = document.getElementById(props.appName);
//   // if (styleLabel) {
//   //   styleLabel.style.display = 'block';
//   // }
//   // document.head.appendChild(props.styleTag[props.name]);
//   return lifecycles.mount(props);
// }

// const unmount = (props) => {
//   console.log('unmount', props.styleTag)
//   // const styleLabel = document.getElementById(props.appName);
//   // if (styleLabel) {
//   //   styleLabel.style.display = 'none';
//   // }
//   // props.styleTag[props.appName].remove();
//   // diffSandbox.inactive();
//   return lifecycles.unmount(props);
// }

// export const bootstrap = lifecycles.bootstrap;
// export const mount = lifecycles.mount;
// export const unmount = lifecycles.unmount;
// export function bootstrap(props) {
//   return lifecycles.bootstrap(props);
// }

// export function mount(props) {
//   return lifecycles.mount(props);
// }

// export function unmount(props) {
//   return lifecycles.unmount(props);
// }



// export const { bootstrap, mount, unmount } = lifecycles;
export default lifecycles;



// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom';//导入single-spa
// // import Router from './router';
// import Container from './Container';


// ReactDOM.render(
//   <React.StrictMode>
//     {/* <Router>
//       <Container/>
//     </Router> */}
//     <Container/>
//   </React.StrictMode>,
//   document.getElementById('micro-content')
// )
