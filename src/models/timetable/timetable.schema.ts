// language=GraphQL Schema
const Timetable: string = `
  type Lesson {
    startTime: String!
    endTime: String!
    module: Module!
    group: String
    type: String!
    rooms: [Room!]!
    weeks: [Week!]!
  }

  type Timetable {
    _id: ID!
    monday: [Lesson!]!
    tuesday: [Lesson!]!
    wednesday: [Lesson!]!
    thursday: [Lesson!]!
    friday: [Lesson!]!
    saturday: [Lesson!]!
  }
`;

export default Timetable;
