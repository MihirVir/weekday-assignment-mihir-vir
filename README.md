# Weekday Assignment

This is a candidate application platform which lets users to apply for various job opportunities

## Installation Guide
There are two ways of installing this react application.
### Method 1: (Docker)
- make sure you have Docker installed https://www.docker.com/products/docker-desktop/
- Make sure you have docker desktop running in the background.
- Use the following command to install the necessary dependencies
    ```bash
        docker build -t <your_docker_id>/weekday-assignment .
    ```
- To run this application write the following command 
    ```bash
        docker run -p 5173:5173 <your_docker_id>/weekday-assignment
    ```
- Now you can access your application on http://localhost:5173

### Method 2: (Run Locally)
- To install the dependencies use the following command:
    ```bash
        npm install
    ```
- To run the application on port 5173 use the following command:
    ```bash
        npm run dev
    ```
- Now You can access your application on http://localhost:5173

## Libraries used
- React: used to build reusable components
- react-icons: Opensource library containing popular icons which can be easily implemented in your application

## Why not MaterialUI?
I am familiar with material ui but I didn't feel the need to use it for this assignment as the task could be easily achieved with using vanilla CSS and I am more comfortable rocking tailwind or vanilla css than using a pre built styled components which are hard to customise.

## Why Context over Redux in this scenario?
Well, redux is a third party library used for global state management. In this application we only had the requirements to build the search part of the application.

Redux wouldve been overkill for this Single Page Application which don't need complex state management.

Context shines best when you need to transfer data from parent to  child componented without prop drilling. Using redux in this didn't seem to be the right idea in this part of the assignment.

## Folder Structure
- components [contians reusable code]
- hooks [custom hooks created for reusability]
- data [contains dummy data]
- context [contians search context]
- pages [if in future you wan't to scale the application making it a multi page app that's why I used the directory]