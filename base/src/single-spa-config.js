import { registerApplication, start } from "single-spa";
// import urlJoin from "url-join";
// import axios from "axios";

async function loadScript(url) {
  return new Promise((resolve, reject) => {
    // 创建标签,并将标签加到head中
    let script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    script.crossOrigin = true;
    document.body.appendChild(script);
  });
}
// 注册应用
registerApplication(
  "achieve-subset",
  async () => {
    // 加载子组件导出的类库和资源
    await loadScript(`http://localhost:3000/achieve-subset.js`);
    return window.singleAchieveSubset; // 返回子应用里导出的生命周期,mount,ummount,bootstrap
  },
  // 当用户切换到/achieve_subset的路径下时，加载刚才定义子子应用
  (location) => location.pathname.startsWith("/achieve_subset"),
  { "info": this.store}
);

// // 注册应用
// registerApplication(
//   "achieve-subset",
//   async () => {
//     // 加载子组件导出的类库和资源
//     await loadScript(`http://localhost:3000/achieve-subset.js`);
//     return window.singleAchieveSubset; // 返回子应用里导出的生命周期,mount,ummount,bootstrap
//   },
//   //通过System引入，似乎因为没有安装支持的库所有方法没有被读取
//   // () => (window).System.import('react-test'),
//   //以下方法通过axios获取子应用文件，跨域问题没有解决
//   // async () => {
//   //   await loadResources("http://localhost:3000/static/js/bundle.js");
//   //   return window.singleAchieveSubset;
//   // },
//   // 当用户切换到/react_app的路径下时，加载刚才定义子子应用，在完成后记得修改地址
//   (location) => location.pathname.startsWith("/react_app"),
//   { "message": 'hello!'}
// );
start();



//以下方法通过axios获取子应用文件，跨域问题没有解决
// export const loadResources = async (url) => {
//   let [css, js] = await getManifest(url);
//   return Promise.all([loadStyles(css), loadScripts(js)]);
// };

// export const getFirstKey = (obj) => {
//   if (!obj) return;
//   return Object.keys(obj)[0];
// };

// export const getManifest = (url) =>
//   new Promise(async (resolve) => {
//     // const u = urlJoin(url, "manifest.json");
//     const u = url;

//     const { data } = await axios.get(u);

//     const { entrypoints, publicPath } = data;
//     const key = getFirstKey(entrypoints);
//     if (!key) {
//       return resolve([]);
//     }
//     const assets = (entrypoints[key].assets || []).filter((file) =>
//       /(\.css|\.js)$/.test(file)
//     );
//     const css = [],
//       js = [];
//     for (let i = 0; i < assets.length; i++) {
//       const asset = assets[i];
//       const assetPath = urlJoin(publicPath, asset);
//       if (/\.css$/.test(asset)) {
//         css.push(assetPath);
//       } else if (/\.js$/.test(asset)) {
//         js.push(assetPath);
//       }
//     }
//     resolve([css, js]);
//   });

//   export const loadStyles = async (res) => {
//     res = (res || []).filter((href) => !Boolean(hasLoadedStyle(href)));
//     return Promise.all(res.map(createStyle));
//   };
//   export const loadScripts = async (res) => {
//     res = (res || []).filter((src) => !Boolean(hasLoadedScript(src)));
//     for (let i = 0; i < res.length; i++) {
//       await createScript(res[i]);
//     }
//   };
//   export const createScript = (url) => {
//     return new Promise((resolve, reject) => {
//       const script = document.createElement("script");
//       script.src = url;
//       script.onload = resolve;
//       script.onerror = reject;
//       const firstScript = document.getElementsByTagName("script")[0];
//       firstScript.parentNode.appendChild(script, firstScript);
//     });
//   };

//   export const hasLoadedStyle = function (link) {
//     return (Array.prototype.slice.apply(document.styleSheets) || []).find(
//       (e) => e.href === link
//     );
//   };
  
//   export const hasLoadedScript = function (src) {
//     return (Array.prototype.slice.apply(document.scripts) || []).find(
//       (e) => e.src === src
//     );
//   };

//   export const createStyle = async (url) => {
//     return new Promise((resolve, reject) => {
//       const styleLink = document.createElement("link");
//       styleLink.link = url;
//       styleLink.onload = resolve;
//       styleLink.onerror = reject;
//       document.head.appendChild(styleLink);
//     });
//   };
  

