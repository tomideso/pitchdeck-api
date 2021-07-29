# Getting Started

This is the backend API for the pitchdeck.

## Available Scripts

To install the needed dependencies, you can run:

### `npm install`

### Additional dependency

This project depends on `GraphicsMagick`, Install `GraphicsMagick` using:

#### `sudo apt-get install graphicsmagick`

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to test.

## Environment Variables

Add a `.env` file to the root folder of this project.
A sample `.env_sample` has been included

PORT=8000
DATABASE_URL=mongodb://localhost:27017/wefunder
SESSION_SECRET=<`YOUR_CHOICE`>

You can point to a different mongodb of your choosing otherwise use a local installed.

It is assumed this dashboard and the API will be run and tested on the same local machine.
