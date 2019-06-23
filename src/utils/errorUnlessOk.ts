export const throwErrorUnlessOk = (response: Response): Promise<any> => {
    if (!(response && response.ok)) {
        return Promise.reject(response);
      }
    
      // resp may not contain any json body and if so, just return the resp
      return response.json().catch(() => new Promise((resolve) => resolve(response)));
  };