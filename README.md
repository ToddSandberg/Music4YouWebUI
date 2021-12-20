# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

PLEASE DO `npm run build` BEFORE PUSHING TO MAKE SURE YOU DONT HAVE BREAKING CHANGES.

## Automatically Format Code

Build will fail if you add poopy doodoo code. Auto formatting on save may make it easier.

### VSCode

#### 1. Install ESLint
1. Go to extensions on the bar all the way to the left of the screen
2. Search for eslint

#### 2. Auto format on save
1. File > Preferences > Settings
2. Search "code actions on save"
3. Hit "Edit in settings.json"
4. Add following
```
    {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
        },
        "eslint.validate": ["javascript"]
    }
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.