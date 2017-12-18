# Set up

1. Install nodejs  https://nodejs.org/en/download/ 
2. Install Visual Studio Code https://code.visualstudio.com/
3. Install Chrome plugin for react
4. Create your own react app
    ```
    npm install -g create-react-app
    create-react-app my-app
    cd my-app/
    npm start
    ```
    Then open http://localhost:3000/ to see your app.

5. Install dependency packages:
npm install --save react react-dom react-scripts
npm install --save react-redux
npm install --save redux redux-thunk redux-logger
npm install --save react-router-dom

6. Install eslint:
install:  https://www.npmjs.com/package/eslint
```
npm install eslint --save-dev
```

undner project do init, chose the airbnb style: popular-guid->airbnb->y->json
```
"eslint --init" 
```
```
eslint xx.js
```
```
eslint xx.js --fix 
```

7. Install [Eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for Visual Studio Code

8. Install [flow](https://flow.org/en/docs/install/)
```sh
$ npm install --save-dev babel-cli babel-preset-flow
$ npm install --save-dev flow-remove-types
$ npm install --save-dev flow-bin
$ npm run flow
$ npm run flow init
```
9. Install [Flow plugin](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode) for Visual Studio Code
