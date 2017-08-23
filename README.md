# UL Timetable API

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

## Environment variables

Environment variables can be set at system level, or can be configured using a dotenv (`.env`) environment variables file.

| Npm Script | Description |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| `NODE_ENV`                | Can be set to `development` or `production`                                              |
| `PORT`                    | Defaults to `3000` in development and `8080` in production                               |
| `MONGODB_URI`             | URI of the MongoDB database to use                                                       |

## Scripts

| Npm Script | Description |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| `start`                   | Runs full build before starting all watch tasks. Can be invoked with `npm start`         |
| `build`                   | Full build. Runs ALL build tasks (`build-ts`, `tslint`)                                  |
| `serve`                   | Runs node on `dist/server.js` which is the apps entry point                              |
| `watch`                   | Runs all watch tasks (TypeScript, Node). Use this if you're not touching static assets.  |
| `build-ts`                | Compiles all source `.ts` files to `.js` files in the `dist` folder                      |
| `watch-ts`                | Same as `build-ts` but continuously watches `.ts` files and re-compiles when needed      |
| `tslint`                  | Runs TSLint on project files                                                             |

## GraphQL schema

```graphql schema
schema {
  query: RootQuery
}

# A type describing the root query.
type RootQuery {
  # Request a student's timetable.
  timetable(
    # The student's ID number.
    _id: ID!,
    # Week numer as displayed on the timetable (optional).
    week: String
  ): Timetable
  
  # Request module details.
  module(
    # The module code.
    _id: ID!
  ): Module
  
  # Request room details.
  room(
    # The room number.
    _id: ID!
  ): Room
  
  # Request week details.
  week(
    # Week number as displayed on the timetable.
    _id: ID!
  ): Week
  
  # Request all weeks.
  weeks: [Week!]!
}

# A type that describes a module.
type Module {
  # The module's code.
  _id: ID!
  # The module's name.
  name: String!
}

# A type that describes a room.
type Room {
  # The room number.
  _id: ID!
  # The name of the building in which the room is located.
  building: String!
  # The code of the building in which the room is located.
  buildingCode: String!
  # The floor on which the room is located.
  floor: String!
  # The numeric part of the room number.
  number: String!
}

# An enum describing a lesson's type.
enum Type {
  LEC # Lecture
  TUT # Tutorial
  LAB # Lab
}
  
# A type describing a single lesson on a timetable.
type Lesson {
  # The lesson's start time on the 24-hour clock.
  startTime: String!
  # The lesson's end time on the 24-hour clock.
  endTime: String!
  # The lesson's module.
  module: Module!
  # The lesson's group, if applicable.
  group: String
  # The lesson's type (lab, lecture or tutorial).
  type: Type!
  # The room(s) in which the lesson is held.
  rooms: [Room!]!
  # The week(s) in which the lesson is held.
  weeks: [Week!]!
}

# A type describing a student's timetable.
type Timetable {
  # The student's ID number.
  _id: ID!
  # The timetable's lessons held on a Monday.
  monday: [Lesson!]!
  # The timetable's lessons held on a Tuesday.
  tuesday: [Lesson!]!
  # The timetable's lessons held on a Wednesday.
  wednesday: [Lesson!]!
  # The timetable's lessons held on a Thursday.
  thursday: [Lesson!]!
  # The timetable's lessons held on a Friday.
  friday: [Lesson!]!
  # The timetable's lessons held on a Saturday.
  saturday: [Lesson!]!
}
  
# A type describing a week of the current semester.
type Week {
  # The week number displayed on the timetable.
  _id: ID!
  # The teaching week name.
  name: String!
  # The ISO8601 datetime on which the week commences.
  date: Date!
}
```
