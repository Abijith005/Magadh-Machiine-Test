function generateOrderId() {
    const randomComponent = Math.floor(Math.random() * 10000);
  
    const timestamp = new Date().getTime();
  
    const orderId = `${timestamp}${randomComponent}`;
  
    return orderId;
  }

  export default generateOrderId
