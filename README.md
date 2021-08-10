# Webpack CreativeSite Boilerplate

A boilerplate for web creativesite, based on Webpack

* Threejs Template
* JavaScript Build
* Css Build (scss/autoprefixer)
* Css / JavaScript lint
* Image Optimization (webp)
* Browsersync

Directory structure

```
.
├── dist
│    │
│    ├── assets/         
│    │    │
│    │    ├── images    
│    │    │
│    │    ├── script 
│    │    │
│    │    └── stylesheets
│    │
│    └── index.html 
│
├── src ── assets/         
│           │
│           ├── images    
│           │
│           ├── script ────────── module
│           │                 └── shaders
│           │                 └── utility
│           │                 └── app.js
│           │                 
│           └── stylesheets
│    
├── .env-sample     
│
├── eslintrc.js 
│
├── gitignore
│
├── squooshrc.js      
│
├── stylelintrc.js         
│
├── package-lock.json          
│
├── package.json  
│
└── webpack.config.js  
```


<img src="https://user-images.githubusercontent.com/47776346/126886480-534b8b46-6534-4ad5-98ec-78e2b1633ec9.png" width="600px">

## Usage
* Clone repository<br>
* Install Node.js<br>
* Create an `.env` file and copy the contents of `.env-sample`. <br>
* Run following commands<br>
```
  npm install
  npm run dev
```

* Before deploying, run command for production.<br>
```
  npm run prod
```
