# UL Timetable API

[![Dependency Status](https://david-dm.org/videtur/ul-timetable-api.svg)](https://david-dm.org/videtur/ul-timetable-api)
[![Build Status](https://travis-ci.org/videtur/ul-timetable-api.svg?branch=master)](https://travis-ci.org/videtur/ul-timetable-api) 

GraphQL API for the University of Limerick's timetable.

## Features
- Webscraper for [www.timetable.ul.ie](http://www.timetable.ul.ie)
- Written in TypeScript
- Uses DataLoader for per-request caching
- Caches scraped data in MongoDB
- GraphiQL IDE for development and debugging

## Pre-requisites
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)

## Getting started
- Clone the repository
```
$ git clone https://github.com/videtur/ul-timetable-api.git
```
- Install dependencies
```
$ cd <project_name>
$ npm install
```
- Start your MongoDB server (you'll probably want another command prompt)
```
$ mongod
```
- Build and run the project
```
npm start
```
Navigate to `http://localhost:3000`

## Scripts

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build before starting all watch tasks. Can be invoked with `npm start`                  |
| `build`                   | Full build. Runs ALL build tasks (`build-ts`, `tslint`)                                           |
| `serve`                   | Runs node on `dist/server.js` which is the apps entry point                                       |
| `watch`                   | Runs all watch tasks (TypeScript, Node). Use this if you're not touching static assets.           |
| `build-ts`                | Compiles all source `.ts` files to `.js` files in the `dist` folder                               |
| `watch-ts`                | Same as `build-ts` but continuously watches `.ts` files and re-compiles when needed               |
| `tslint`                  | Runs TSLint on project files                                                                      |
