import { gql } from "@apollo/client";

// const GET_PROJECTS_OLD = gql`
//   query Projects {
//   Projects {
//     nameProject
//     budget
//     startDate
//     endDate
//     statusProject
//     stageProject
//   }
// }
// `;

const GET_PROJECTS = gql`
  query ListProjects {
    ListProjects {
      _id
      nameProject
      budget
      startDate
      statusProject
      stageProject
    }
  }
`;

const GET_PROJECT_BY_ID = gql`
  query DetailProject($_id: String!) {
    DetailProject(_id: $_id) {
      nameProject
      budget
      startDate
      endDate
      statusProject
      stageProject
      leader {
        name
        lastname
      }
      advancement {
        date
        description
        observations
        createdBy {
          name
        }
      }
      inscription {
        dateStart
        dateEnd
        student {
          name
          lastname
        }
      }
      objective {
        description
        typeObjective
      }
    }
  }
`;

export { GET_PROJECTS, GET_PROJECT_BY_ID };
