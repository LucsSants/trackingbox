import { gql } from '@apollo/client'
import client from './client'
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



export async function CreateOrder(orderCode: string, orderTitle: string, statusDate:string, statusTime:string, statusTitle:string) {
  await client.mutate({
    mutation: gql`
    mutation (
      $orderTags: TagCreateManyInlineInput = {create: }}
      ) {
      createOrder(
        data: {orderCode: "${orderCode}", orderLastStatus: {create: {statusDate: "${statusDate}", statusTime: "${statusTime}", statuses: "${statusTitle}"}}, orderTags: $orderTags, orderTitle: "${orderTitle}", cljp1sjnm114m01t91lh306fj: {connect: {uid: "${currentUser}"}}}
      ) {
        id
      }
    }
    `
  }).then( async (data)=>{
     await client.mutate({
      mutation: gql`
      mutation{
        publishOrder(where: {id: "${data.data.createOrder.id}"}) {
          id
        }
      }
      `
    })
  })
  .catch(error => console.error(error))
}

export async function CreateOrderTwo(orderCode: string, orderTitle: string, statusDate:string, statusTime:string, statusTitle:string, tags:string) {
  await client.mutate({
    mutation: gql`
    mutation MyMutation($orderTags: TagCreateManyInlineInput = {create:${tags}}) {
      createOrder(
        data: {cljp1sjnm114m01t91lh306fj: {connect: {uid: "${currentUser}"}}, orderCode: "LB568216445HKa", orderLastStatus: {create: {statusDate: "${statusDate}", statusPlace: "", statusTime: "${statusTime}", statuses: "${statusTitle}"}}, orderTags: $orderTags, orderTitle: "${orderTitle}"}
      ) {
        id
      }
    }
    `
  }).then( async (data)=>{
     await client.mutate({
      mutation: gql`
      mutation{
        publishOrder(where: {id: "${data.data.createOrder.id}"}) {
          id
        }
      }
      `
    })
  })
  .catch(error => console.error(error))
}