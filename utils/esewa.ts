export interface EsewaPayment {
    amount: number;
    productDeliveryCharge: number;
    transactionUuid: string;
    taxAmount: number;
    totalAmount: number;
    productServiceCharge: number;
    signature: string;
  }
  
  export function submitEsewaPayment(paymentData: EsewaPayment): void {
    const {
      signature,
      amount,
      taxAmount,
      totalAmount,
      transactionUuid,
      productDeliveryCharge,
      productServiceCharge,
    } = paymentData;
  
    const failure_url = "http://192.168.1.74:3002/api/v1";
    const product_code = "EPAYTEST";
    const successUrl = "http://192.168.1.74:3002/api/v1/complete-purchase/esewa";
    const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
  
    const formData = {
      amount: amount,
      failure_url: failure_url,
      product_delivery_charge: productDeliveryCharge,
      product_service_charge: productServiceCharge,
      product_code: product_code,
      signature: signature,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: successUrl,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      transaction_uuid: transactionUuid,
    };
  
    const form = document.createElement("form");
    form.method = "POST";
    form.action = path;
  
    for (const key in formData) {
      const hiddenField = document.createElement("input");
      hiddenField.type = "hidden";
      hiddenField.name = key;
    //   @ts-ignore
      hiddenField.value = String(formData[key]);
      form.appendChild(hiddenField);
    }
  
    document.body.appendChild(form);
    form.submit();
  }