/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStore = /* GraphQL */ `
  subscription OnCreateStore {
    onCreateStore {
      id
      name
      inventory {
        items {
          id
          name
          price
        }
        nextToken
      }
    }
  }
`;
export const onUpdateStore = /* GraphQL */ `
  subscription OnUpdateStore {
    onUpdateStore {
      id
      name
      inventory {
        items {
          id
          name
          price
        }
        nextToken
      }
    }
  }
`;
export const onDeleteStore = /* GraphQL */ `
  subscription OnDeleteStore {
    onDeleteStore {
      id
      name
      inventory {
        items {
          id
          name
          price
        }
        nextToken
      }
    }
  }
`;
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
      id
      name
      price
      store {
        id
        name
        inventory {
          nextToken
        }
      }
    }
  }
`;
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
      id
      name
      price
      store {
        id
        name
        inventory {
          nextToken
        }
      }
    }
  }
`;
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
      id
      name
      price
      store {
        id
        name
        inventory {
          nextToken
        }
      }
    }
  }
`;
