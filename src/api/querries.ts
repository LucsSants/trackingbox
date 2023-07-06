import { gql } from '@apollo/client'
import auth from '@react-native-firebase/auth'
const currentUser = auth().currentUser?.uid
console.log(currentUser)

export const GET_ALL_ORDERS = gql`
  query {
    firebaseUser(where: {uid:"${currentUser}"}) {
      id
      orders {
        id
        orderCode
        orderTitle
        orderTags {
          id
          tagTitle
          tagColor {
            hex
          }
        }
        orderLastStatus {
          id
          statusDate
          statusTime
          statuses
        }
      }
    }
  }
`

export async function CREATE_AND_PUBLISH_ORDER() {
   const  CREATE = gql`
    
  `
}