import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
// import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  cartTable: FormGroup;
  subtotal: number = 0;
  totalSum: number = 0;
  myFormValueChanges$;


  constructor(
    private formbuilder: FormBuilder,
    // private currencyPipe: CurrencyPipe
  ) { }

  /**
   * Form initialization
   */
  ngOnInit() {
    // create form with validators and dynamic rows array
    this.cartTable = this.formbuilder.group({
      unitsCart: this.formbuilder.array([
        // load first row at start
        this.getUnit()
      ])
    });

    // initialize stream on units
    this.myFormValueChanges$ = this.cartTable.controls['unitsCart'].valueChanges;
    // subscribe to the stream so listen to changes on units
    this.myFormValueChanges$.subscribe(unitsCart => this.updateTotalUnitPrice(unitsCart));

  }

  /**
   * Create form unit
   */
  private getUnit() {
    const numberPatern = '^[0-9.,]+$';
    return this.formbuilder.group({
      prodPrice: ['', [Validators.required, Validators.pattern(numberPatern)]],
      prodQty: [1, [Validators.required, Validators.pattern(numberPatern)]],
      prodSubTotal: ['', [Validators.required, Validators.pattern(numberPatern)]],
      prodVAT: ['', [Validators.required, Validators.pattern(numberPatern)]],
      prodGrandTotal: [{ value: '', disabled: true }]
    });
  }

  /**
   * Remove unit row from form on click delete button
   */
  removeUnit(i: number) {
    const control = <FormArray>this.cartTable.controls['units'];
    control.removeAt(i);
  }

  private updateTotalUnitPrice(units: any) {
    // get our units group controll
    const control = <FormArray>this.cartTable.controls['units'];
    // before recount total price need to be reset. 
    this.totalSum = 0;
    for (let i in units) {
      let totalUnitPrice = (units[i].prodQty * units[i].prodPrice);
      // now format total price with angular currency pipe
      // let totalUnitPriceFormatted = this.currencyPipe.transform(totalUnitPrice, 'MUR', 'symbol-narrow', '1.2-2');
      // update total sum field on unit and do not emit event myFormValueChanges$ in this case on units
      control.at(+i).get('unitTotalPrice').setValue(totalUnitPrice, { onlySelf: true, emitEvent: false });
      // update total price for all units
      this.totalSum += totalUnitPrice;
    }
  }

  subtotalCal(prodQty: number, prodPrice: number) {
    return this.subtotal = prodQty * prodPrice
  }
  vatCal(subtotal: number) {
    return 0.15 * subtotal
  }
  grandTotalcal(subtotal: number) {
    return 1.15 * subtotal + 200
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.cartTable.value);
  }

}