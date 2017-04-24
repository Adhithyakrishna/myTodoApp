# myTodoApp
A simplistic node js responsive app that keeps you on progress all the time.  

# Description
Started this project out of hope that it might be a means to address and help out every Developer's universal problem called "EOD status update".

# Demo site

https://mytasklistapp.herokuapp.com/

# Features
  1) Lets you add a task, move the task to completed list if completed and remove the task from your task list if its transfered to your team-mate or becomes futile.
  2) Gets list of completed and removed tasks by date of updation.
  3) Gives you option to copy the status directly by a click of a button, supports JIRA format.
  4) Lets you reopen a task should you wish to and re-opened task are hightlighted and shown with newly updated description.

# Project makes use of
  1) node js and packages
  2) handlebars
  3) css ( will be updated to scss in near future )
  4) mlab for storing the databases

# Prerequisites
  1) A little bit of knowledge in node and npm.
  2) Knowledge in Handlebars or any templating languages
  3) Knowldege in Mongo db
  4) Ajax request and response handling

# installation
  1) Clone or download the repository 
  2) Open command prompt inside the root folder and enter the command "npm install", which should install all the dependancy packages in node_modules folder.
  3) After it is done, in command prompt type "node index.js"

   *All the configurations are pre-configured to run directly. The datas for the demo website are all stored in mlab website
   
   https://api.mlab.com/api/1/databases/testdbfortasklist/collections/users?apiKey=arl5ftCIJaqMD8ONxWhaeWRrs6v8-wH0
  
  please do not misuse the demo site by adding weird/bad-language tasks and task description.
  
# credits
  1) https://www.youtube.com/user/TechGuyWeb -Traversy creates a real-world app in real time. Kudos to you!!
  2) https://www.facebook.com/groups/359999434098189/ - nodejs dev group, response comes flying within seconds.
  2) Opensource community - glory to all the big hearts

# Future improvements
 1) Add priority for new tasks and re-opened tasks.
 2) Sort tasks based on priority or date created.
 3) UI improvements
  
