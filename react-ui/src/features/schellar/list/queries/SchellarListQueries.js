import { gql } from '@apollo/client'

export const SCHELLAR_LIST_QUERY = gql`
  query scheduleList {
    scheduleList {
      name
      enabled
      cronString
      fromDate
      toDate
      workflowName
      workflowVersion
      workflowContext
      parallelRuns
    }
  }
`
