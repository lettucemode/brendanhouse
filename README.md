# Brendan House

Source code and AWS infrastructure for https://www.brendanhouse.com.

## Goals and Design Rationale

After some discussion, we landed on the following primary goals for the site:

- Minimum cost possible
- Custom domain
- Generally a simple, blog/informational site
- Some custom functionality
  - create events that visitors can sign up for
  - allow download/upload of documents for Vessels of Honor program
  - accept payments for Vessels of Honor program

To meet these, I decided to build out a custom site from scratch. There are several popular WYSIWYG tools out there for creating one's own site (Wordpress, Wix, Squarespace, etc.) which have good free or low-cost plans. However, they get more costly when you need a custom domain, custom functionality via plugins, or need to process payments.

## Technology stack

I settled on [Amazon Web Services](https://aws.amazon.com/) for the hosting provider. Other options I considered included Netlify, Azure, Vercel, and GCP. AWS has a solid, year-long free tier and plenty of documentation for the site's use cases. I also had some prior experience with it from my day job and was interested in improving my skills with it.

The infrastructure is currently deployed and hosted through [AWS Amplify](https://aws.amazon.com/amplify/), a suite of tools and services AWS provides for quickly getting a site up and running. At some point I will probably want to ditch these tools and do everything myself. They are very useful and the tooling is pretty impressive, but 1) they are overkill for the site's needs in some areas, and 2) they obscure things about how AWS actually works that I would rather not have hidden from me long-term.

The site itself is CRA blah blah.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
