import { GraphQLError } from 'graphql';

export function assertValidStudentId(id: string) {
  if (!/^[0-9]{7,8}$/.test(id)) {
    throw new GraphQLError(`Student ID "${id}" is invalid.`);
  }
}

// language=GraphQL Schema
export const timetableSchema: string = `
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
`;
