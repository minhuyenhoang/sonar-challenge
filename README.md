# **Sonar Challenge**

## Tech stack

Backend:

- Django
- Celery

Frontend:

- React
- Material UI

The backend stack is running in a Docker container for easier development and testing.

## Guide to run this project

### Set up environment

- Clone this repository to your local machine.

- You will need to download Docker Desktop in order to run Docker locally. Please follow their instructions on how to install it: Link['https://docs.docker.com/desktop/#download-and-install']

- Once the Docker Desktop has been downloaded, please check the **File Sharing** configuration (Settings > Resources > File Sharing) to make sure that Docker can access the path that your cloned repository resides in.

**Note:**

- For security reason, API keys are not allowed on GitHub, thus, you will need to sign up for SendGrid and create your own API key.

- You will also need to create a sender and verify that sender email.

- After you have done them, please replace `SENDGRID_API_KEY` with your API key, and `SENDER` with your verified sender email.

### Execute the project

- Open your terminal/command line.

- Navigate to the `docker-compose.yml` file inside `backend` folder.

- Run this command `docker-compose build`. This will build the Docker image for our backend.

- Run this command `docker-compose up` to start the Docker.

- Once your backend is up and running, you can open another terminal/command line to navigate to `frontend` folder.

- Run `npm run start` to start the React app.
