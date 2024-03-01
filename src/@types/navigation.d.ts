export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      signin: undefined;
      signup: undefined;
      home: undefined;
      new: undefined;
      profile: undefined;
      details: {orderCode: string, orderTitle: string, orderID: string, orderLastStatusId: string}
    }
  }
}