export class OrderDetail {
    orderdate: Date;
    cusid: string;
    productid: string;
    orderid: number;
    description: string;
    quantity: number;
    unitprice: number;
    taxcode: string;
    linetaxamt: number;
    lineexcl: number;
    lineincl: number;
    totaltax: number;
    totalexcl: number;
    totalincl: number;
}