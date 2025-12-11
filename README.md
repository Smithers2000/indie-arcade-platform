# indie-arcade-platform
this is a self build game platform that will host games made by me and friends

This repository includes Firebase web config (apiKey, etc.), which is required for Firebase Hosting / Auth. This is publicly visible to users; true security is enforced via Firebase Security Rules, not the apiKey.”

What this system does:
  Lets you manage your game catalog (add / edit / delete games) through a browser-based admin panel.
  Allows uploading thumbnail images (or other assets) via your browser — no external image hosting needed.
  Stores all data and assets in Firebase:
  Game metadata in Firestore (gamesCatalog), Thumbnail images in Firebase Storage.
  Enforces secure access: only authenticated admins can modify the catalog or upload assets.
  Public store: regular users (or guests) can view the catalog and play only games they own or are free.

  Folder / File Setup (in firebase/public/)
/firebase/public/
   ├── admin.html          ← Admin panel UI (add new games)  
   ├── admin.js            ← JS logic + Firebase connection + upload support  
   ├── firebase-auth.js    ← Shared auth logic (sign-in / sign-up / user state)  
   ├── josh game store.html← User-facing store page listing games  
   ├── [other game HTML files]  
   └── ...                 ← other frontend files
