# Brendan House

Source code and AWS infrastructure for https://www.brendanhouse.com.

## Goals and Design Rationale

After some discussion, we landed on the following primary goals for the site:

- Custom domain
- Generally a simple, blog/informational site
- Minimum cost possible
- Some custom functionality
  - create events that visitors can sign up for
  - allow download/upload of documents for Vessels of Honor program
  - accept payments for Vessels of Honor program

There are several popular WYSIWYG tools out there for creating one's own site (Wordpress, Wix, Squarespace, etc.) which have good free or low-cost plans. However, they get more costly when you need a custom domain, custom functionality via plugins, or need to process payments. I decided to build out a custom site from scratch.

## Technology stack

I settled on [Amazon Web Services](https://aws.amazon.com/) for the hosting provider. Other options I considered included Netlify, Azure, Vercel, and GCP. In general I found these don't have good free/starter plans, or require a paid plan if you are accepting payments from users. AWS has a solid, year-long free tier and plenty of documentation for the site's use cases. I also had some prior experience with it from my day job and was interested in improving my skills with it.

The infrastructure is currently deployed and hosted through [AWS Amplify](https://aws.amazon.com/amplify/), a suite of tools and services AWS provides for quickly getting a site up and running. At some point I will probably want to ditch these and switch to CloudFormation or Terraform. The tools are very useful and impressive, but 1) they are overkill for the site's needs in some areas, and 2) they obscure things about how AWS actually works that I would rather not have hidden from me long-term.

The site itself was bootstrapped with [CRA](https://github.com/facebook/create-react-app). I originally wanted to use Next.js, but then found out that Amplify doesn't support it fully (dynamic pages don't work or something). In the future, I may want to switch to Next.js and change the hosting setup to a CloudFront distribution pointing at an S3 bucket configured for static site hosting.

## Working with the site

`yarn start` to run locally.

You'll need to install and configure [Amplify CLI](https://docs.amplify.aws/cli) to pull down all the backend config so the frontend can connect and talk to the infrastructure. Contact me (lettucemode) for access to the AWS account.

To deploy, push to `main` and wait for CI/CD to finish.
