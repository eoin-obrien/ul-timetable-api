// language=GraphQL
const typeDefinitions = `
enum Type {
  LEC # Lecture
  TUT # Tutorial
  LAB # Lab
}

# A type describing a single lesson on a timetable.
type StudentTimetableLesson {
  # The lesson's start time on the 24-hour clock.
  startTime: String
  # The lesson's end time on the 24-hour clock.
  endTime: String
  # The lesson's module.
  module: Module
  # The lesson's group
  group: String
  # The lesson's type (lab, lecture or tutorial).
  type: Type
  # The faculty member teaching the module
  tutor: String
  # The room(s) in which the lesson is held.
  rooms: [Room]
  # The week(s) in which the lesson is held.
  weeks: [Week]
}

# A type describing a timetable.
type StudentTimetable {
  # The timetable's ID number.
  id: String!
  # The timetable's lessons held on a Monday.
  monday: [StudentTimetableLesson]
  # The timetable's lessons held on a Tuesday.
  tuesday: [StudentTimetableLesson]
  # The timetable's lessons held on a Wednesday.
  wednesday: [StudentTimetableLesson]
  # The timetable's lessons held on a Thursday.
  thursday: [StudentTimetableLesson]
  # The timetable's lessons held on a Friday.
  friday: [StudentTimetableLesson]
  # The timetable's lessons held on a Saturday.
  saturday: [StudentTimetableLesson]
}

# A type that describes a module.
type Module {
  # The module's code.
  id: String!
  # The module's name.
  name: String
}

# A type that describes a room.
type Room {
  # The room number.
  id: String!
  # The name of the building in which the room is located.
  building: String
  # The code of the building in which the room is located.
  buildingCode: String
  # The floor on which the room is located.
  floor: String
  # The numeric part of the room number.
  number: String
}

# A type describing a week of the current semester.
type Week {
  # The week number displayed on the timetable.
  id: String!
  # The teaching week name.
  name: String
  # The ISO8601 datetime on which the week commences.
  date: Date
}

# The queries allowed by the schema
type RootQuery {
  studentTimetable(id: String!): StudentTimetable
  module(id: String!): Module
  room(id: String!): Room
  week(id: String!): Week
  weeks: [Week]
}

# The root GraphQL schema
schema {
  query: RootQuery
}
`;

export default [typeDefinitions];
