//  import { loadRemoteEntry } from '@angular-architects/module-federation';

//   loadRemoteEntry({
//     type: 'module',
//     remoteEntry: 'http://localhost:32533/remoteEntry.js',
//   })
//  .catch((err) => console.error('Error loading remote entries', err))
// .then(() => import('./bootstrap'))
// .catch((err) => console.error(err));
import('./bootstrap').catch((err) => console.error(err));




	


// import Remotes from '../remotes.json'
// const savedRemotes = JSON.parse(localStorage.getItem('remotes') || '[]');
// function updateRemotes(savedRemotes: any[], Remotes: any): void {
//   savedRemotes.forEach(remote => {
//     const [name, url] = Object.entries(remote)[0];
//     Remotes[name] = url;
//   });
// }
// updateRemotes(savedRemotes, Remotes);
// console.log(Remotes);
// const savedRemoteEntries = JSON.parse(localStorage.getItem('remoteEntries') || '[]').map(async (entry:any)=>{
//   try {
//     await loadRemoteEntry(entry)
//   }
//   catch (e) {console.error(e)}
// })
// Promise.all(savedRemoteEntries).then(()=> import('./bootstrap'));





  
  
  
