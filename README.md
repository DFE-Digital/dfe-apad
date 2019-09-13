# Making changes to this prototype

## Set up Git

In order to work on the prototype and make changes to it, you must set up Git. Git is a version control scheme where changes from multiple users can be compiled together to create a release.

The Git hosting provider we use for this prototype is GitHub. To get started, follow the these steps:

1. Set up an account on GitHub with your `education.gov.uk` email address, or use an existing GitHub account.
1. Request access to the `DfE-Digital` organisation, ask a colleague using Slack or internal means to be invited.
1. Accept the invitation to the organisation by finding the `DfE-Digital` organisation in GitHub. If the invitation was sent successfully there will be a banner at the top of the page asking you to accept the invitation, follow the instructions to do so.
1. Download [GitHub Desktop](https://desktop.github.com), or, you can use the command line if you feel comfortable enough.
1. Open GitHub Desktop and sign in to your GitHub account.
1. Go to the repository page.
1. Click the green 'clone or download' button.
1. Click 'Open in Desktop'
1. Choose a location on your computer to save it to.

## Set up authoring tool

Download a code editor, for example, Visual Studio Code or Atom.

## Install Node.js

Go to [https://nodejs.org/en/] and follow the instructions for set up.

## Install modules

1. Open a command line tool.
1. Enter `cd <path of prototype folder>` then press enter.
1. Enter `npm i` then press enter.
1. Resolve any errors that may arise.

## Run prototype

1. Open a command line tool.
1. Enter `cd <path of prototype folder>` then press enter.
1. Enter `npm start` then press enter.
1. Follow the command prompts.

## Making changes

Now the prototype is running you can make changes to any files and view the changes at `http://localhost:3000` (or whichever domain the command prompt shows. When making changes you will notice that the changes show up in the browser. Once you have finished making changes you must save the file to see the result.

## Committing changes

When you have made the neessseary changes you must now commit them. Return to GitHub Desktop. Any changed files will now be 'queued up' to send over to the GitHub repository. In order for them to become live you must 'push' the files up to the repository. In order to do this, follow the on screen commands.

When changes have been 'pushed' to the repository you can see the changes in the live prototype on Heroku, it may take a few minutes for the changes to show up on the live version.
