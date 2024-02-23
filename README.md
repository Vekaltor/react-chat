# React - chat
An application for communication between friends. The assumptions of app are to create something similar to Facebook.

So far, I've implemented login/registration using my API, and additionally,
I've created a socket.io server for real-time communication between users. Users can text each other and see who is online of their friends.

All Data is stored in mongoDB, and socket.io realtime incoming data will be stored in redis. For example, information about messages of a given conversation will be cyclically saved to the mongoDB database - to reduce the database load, redis will be a temporary storage for such data as conversation messages.

In the near Future:
I want add post timeline, where users can be add some comments or reactions.
Add a user settings panel.

## Technologies:
<p>Project is created with:</p>
<ul>
  <li>React version: 18.2.0</li>
  <li>typescript version: 4.9.4</li>
  <li>axios version: 1.3.4</li>
  <li>styled-components version: 5.3.6</li>
  <li>socket.io-client version: 4.6.1</li>
  <li>@reduxjs/toolkit version: 1.9.3</li>
  <li>react-hook-from version: 7.43.2</li>
  <li>react-router-dom version: 6.8.1</li>
</ul>

## Check on your own
link - not available yet

![image](https://github.com/Vekaltor/react-chat/assets/56607344/08012528-cd44-4e32-a9bd-641b4401c6f8)

![image](https://github.com/Vekaltor/react-chat/assets/56607344/8daad816-6ef7-43d3-8860-6d44d6844cb7)


## Setup
To run this project, install it locally using npm:
````
$ cd ../{folder with project}

$ npm install

$ npm start
````

## Features:

### - Account registration form validator
Panel for registration own account - all entered data is validated

### - Chat
Users can Click on some friend and start chatting with him

in the near Future: Available chatting with more friends in one time (groups)

### - Notifications
All inactive conversations that the user is a member of can
get notified of new messages via socket.io by displaying an icon next to the conversation

### - List of Friends (with statuses)
After login to own account, user can see list of friends, sorted firstly by statuses and secondly by  names (ASC)

### - Account activation (email)
After successful registration, the user receives an e-mail with an activation link, the link redirects the user to the activation panel. Clicking on the button activates the account.

### - Theme Switcher

