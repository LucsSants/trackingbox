import { gql } from '@apollo/client'
import client from './client'
import auth from '@react-native-firebase/auth'
const currentUser = auth().currentUser?.uid
console.log(currentUser)

export const GET_ALL_ORDERS= gql`
  query {
    firebaseUser(where: {uid:"${currentUser}"}) {
      id
      orders (first:100,  orderBy: createdAt_DESC){
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

export  function getAllOrders(userId : string | undefined) {
  return gql`
    query {
      firebaseUser(where: {uid:"${userId}"}) {
        id
        orders (first:100,  orderBy: createdAt_DESC){
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
    }`
  }

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

export async function CreateOrderTwo(orderCode: string, orderTitle: string, statusDate:string, statusTime:string, statusTitle:string, tags:string, user:string | undefined) {
  await client.mutate({
    mutation: gql`
    mutation MyMutation($orderTags: TagCreateManyInlineInput = {create:${tags}}) { 
      createOrder(
        data: {cljp1sjnm114m01t91lh306fj: {connect: {uid: "${user}"}}, orderCode: "${orderCode}", orderLastStatus: {create: {statusDate: "${statusDate}", statusPlace: "", statusTime: "${statusTime}", statuses: "${statusTitle}"}}, orderTags: $orderTags, orderTitle: "${orderTitle}"}
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

export async function updateLastStatus(orderId: string, satatusId: string, statusDate:string, statusTime:string, statusTitle:string) {
  await client.mutate({
    mutation: gql`
    mutation MyMutation{
      updateOrder (
        data: {orderLastStatus: {update: {where: {id: "${satatusId}"}, data: {statusDate: "${statusDate}", statusTime: "${statusTime}", statuses: "${statusTitle}"}}}}
        where: {id: "${orderId}"}
      ) {
        id
      }
    }
    `
  }).then( async (data)=>{
     await client.mutate({
      mutation: gql`
      mutation{
        publishOrder(where: {id: "${data.data.updateOrder.id}"}) {
          id
        }
      }
      `
    })
  })
  .catch(error => console.error(error))
}

export async function deleteOrder(orderId: string) {
  await client.mutate({
    mutation: gql`
    mutation {
      deleteOrder(where: {id: "${orderId}"}) {
        id
      }
    }
    `
  })
  .catch(error => console.error(error))
}

export async function createProfile(uid: string) {
  await client.mutate({
    mutation: gql`
    mutation MyMutation {
      createFirebaseUser(data: {uid: "${uid}"}) {
        id
      }
      publishFirebaseUser(where: {uid: "${uid}"}) {
        id
      }
    }
    `
  })
  .catch(error => console.error(error))
}