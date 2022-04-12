# Brendan House

Source code and AWS infrastructure for https://www.brendanhouse.com

## Goals and Design Rationale

After some discussion, we landed on the following primary goals for the site:

- Custom domain
- Generally a simple, blog/informational site
- Minimum cost possible
- Some custom functionality
  - create events that visitors can sign up for
  - allow download/upload of documents
  - accept credit card payments

Consumer web hosting platforms with WYSIWYG capabilties (Wordpress, Squarespace, etc.) wouldn't have satisfied all of the above, so we decided to go with a custom site from scratch.

## Technology stack

I settled on [Amazon Web Services](https://aws.amazon.com/) for the hosting provider. Other options I considered included Netlify, Azure, Vercel, and GCP. In general, I found they don't have as good hobbyist plans as AWS does, or require a paid plan if the site accepts payments from users. AWS has a solid, year-long free tier and plenty of documentation for the site's use cases. I also had some prior experience with it from my day job and was interested in improving my skills with it.

The infrastructure is currently deployed and hosted through [AWS Amplify](https://aws.amazon.com/amplify/), a suite of tools and services AWS provides for quickly getting a site up and running. At some point I may consider switching to CloudFormation or Terraform. The tools are very useful and impressive, but 1) they are overkill for the site's needs in some areas, and 2) they obscure things about how AWS actually works that I would rather not have hidden from me long-term.

The site itself was bootstrapped with [CRA](https://github.com/facebook/create-react-app). I originally wanted to use Next.js, but then found out that Amplify didn't support it at the time. In the future, I may want to switch to Next.js and change the hosting setup to a CloudFront distribution pointing at an S3 bucket configured for static site hosting.

Some things require manual setup still, due to Amplify support:

- The brendanhouse.com domain, currently in Google Domains but could be migrated to AWS Route 53 for platform consistency
- AWS SES account and domain verification

## Working with the code

`yarn start` to run locally.

Amplify works by configuring a webhook & deploy keys on your repo. See [here](https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html) for more information on setting that up.

You'll need to install and configure [Amplify CLI](https://docs.amplify.aws/cli) to pull down all the backend config so the frontend can connect and talk to the infrastructure.

And of course, you'll need your own AWS account to hold everything.

With everything set up, push or merge to `main` to trigger Amplify's deployment processes.
