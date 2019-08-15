export enum ActionTypes {
  fetchImages = "images.fetch.request",
  fetchImagesSuccess = "images.fetch.success",
  fetchImagesFailure = "images.fetch.failure"
}

export default ActionTypes;
//

// Both a JS Object and a TS Type
// const fetch = ActionTypes.fetchImages;
// type MyEnum = ActionTypes.fetchImages;
