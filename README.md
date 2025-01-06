in order to install the app please clone the repo from 
https://github.com/JudaB/my-code-example2

the directory structure as the following

/containers
├── backend/
│   ├── Dockerfile            # Backend Dockerfile
│   ├── server.py             # Python Flask backend code
│   ├── requirements.txt      # Backend dependencies
├── frontend/
│   ├── Dockerfile            # Frontend multi-stage Dockerfile
│   ├── src/
│   │   ├── App.js            # React app entry point
│   │   ├── index.js          # React DOM renderer
│   ├── package.json          # Frontend dependencies
│   ├── package-lock.json     # Lock file for dependencies
├── docker-compose.yml        # Orchestrates the frontend and backend
├── build_and_run.sh          # Script to automate build and deployment
├── README.md                 # Project documentation

when running local without pushing the images to dockerhub

use _build_and_run.sh script

it is build automation script it will try to build each  containers
and will provide error logs in case of failure during the build

once the two containers are build successfully the app will boot, 
the app require to have ports 5000 and 3000 (please make sure they are available)

there are two containers:
1) frontend 
2) backend

frontend contain the react code
backendapp will provide json with data and frontend
will show some debug information and the data which arrive from the json
within a table

it is all set you ready to go , good luck.



Requirements:
- make sure you have docker

architecture:
- note for architecture in the initial design 
  i tried to make the frontend in the bridge network
  where the backend and the frondend will share a private network
  at the end i put them both on the bridge

- the two containers are work properly on bridge interface
  i use the bridge so i can access it from my workstation

- additional private network interface added for inter communication


note for developers:
 - there is a build script which build and upload the image as well
   look for in each container _compile.sh for now it is configure to upload
   the images to dockerhub.com/judab 

troubleshooting:
1. in case you dont see data a "Failed to Fetch" error will pop up,
   you have to make sure the backend url is properly configured in docker-
   compose.yaml ,  you can verify the value of the backendURL it is in the welcome   
   page

2. make sure the backend support CORS 

3. make sure your local PC is able to reach the backend for example
   curl http://localhost:5000/ram



# my-code-example2
