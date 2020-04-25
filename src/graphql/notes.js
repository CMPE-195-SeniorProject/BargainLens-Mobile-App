// "id": "a9f28fbb-9d50-4b03-ab29-f4fc96b2df8b",
// "name": "Walmart"

// "id": "36870231-1956-4cb5-ab18-efc0ef2ac6ef",
// "name": "Whole Foods"

// "id": "3df753f6-6685-4d1d-9f36-f966de34ca62",
// "name": "Safeway"

// "id": "53d73231-eeeb-4d20-866b-dc9799ac9519",
// "name": "Grocery Outlet"

// "id": "db0f6399-d4cc-4842-808d-05dcdb65487a",
// "name": "Target"

// Delete an item
//  mutation deleteItem {
//    deleteItem(input: {id: "dba13108-9c78-47a9-9f00-d1469e258af1"}) {
//      id
//    }
// }

//  List all stores and their inventories
//  query listStores {
//    listStores{
//      items{
//        id
//        name
//        inventory{
//          items{
//            id
//            name
//            price
//          }
//        }
//      }
//    }
// }

// Create Item and add to store, need store id
//  mutation createItem {
//    createItem(input: {name:"apple", price: 1.25, itemStoreId: "db0f6399-d4cc-4842-808d-05dcdb65487a"}){
//      id
//      name
//      price
//      store{name}
//    }
// }

// Create Store
//  mutation createStore {
//    createStore(input:{name: "Target"}){
//      id
//      name
//    }
// }
