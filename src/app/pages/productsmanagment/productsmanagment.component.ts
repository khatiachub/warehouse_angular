import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../../core/data-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import dayjs from 'dayjs';
import { CurrentAllBalance, CurrentBalance, Product } from '../../shared/data-interface';
import { Table } from 'primeng/table';
import { Warehouse } from '../../shared/data-interface';
import { TabViewChangeEvent } from 'primeng/tabview';

@Component({
  selector: 'app-productsmanagment',
  templateUrl: './productsmanagment.component.html',
  providers: [DatePipe],
  styleUrl: './productsmanagment.component.css'
})
export class ProductsmanagmentComponent implements OnInit {
  role = localStorage.getItem('role');
  visible: boolean = false;
  warehouseName = '';
  companyId = 0;

  unit: string[] = [
    'ცალი', 'კგ', 'ლიტრი'
  ];
  selectedUnit!: string;
  editWarehouse = {} as Warehouse;
  editEntry = {} as Product;
  editExit = {} as Product;
  OpenEditForm: boolean = false;
  constructor(private dataService: DataServiceService, private router: Router, private datePipe: DatePipe) {
  }
  addProducts = new FormGroup({
    barcode: new FormControl('', [Validators.required]),
    product_name: new FormControl('', [Validators.required]),
    quantity: new FormControl<null | number>(null, [Validators.required]),
    entry_date: new FormControl('', [Validators.required]),
    operator_id: new FormControl(Number(localStorage.getItem("id"))),
    warehouse_name: new FormControl('')
  });


  exitProducts = new FormGroup({
    barcode: new FormControl('', [Validators.required]),
    product_name: new FormControl('', [Validators.required]),
    quantity: new FormControl<number | null>(null, [Validators.required]),
    exit_date: new FormControl('', [Validators.required]),
    operator_id: new FormControl(Number(localStorage.getItem("id"))),
    warehouse_name: new FormControl(''),
    unit: new FormControl('', [Validators.required])
  });
  addWarehouse = new FormGroup({
    warehouse: new FormControl('', [Validators.required]),
    company_id: new FormControl(0),
    address: new FormControl('', [Validators.required])
  });
  customForm(): FormGroup {
    if (this.activeTabIndex === 0) {
      return this.addProducts
    } else if (this.activeTabIndex === 1) {
      return this.exitProducts
    } else {
      return this.addWarehouse
    }
  }
  submitForm(): void {
    if (this.activeTabIndex === 0) {
      if (this.addProducts.valid) {
        if (this.addProducts.value.quantity?.toString() !== "0") {
          this.addProducts.value.warehouse_name = this.warehouseName;
          const date = this.addProducts.value.entry_date;
          const formattedDate = this.datePipe.transform(date, 'dd-MMM-yyyy');
          this.addProducts.value.entry_date = formattedDate
          this.dataService.addEntryProducts(this.addProducts.value as Product).subscribe({
            next: (response) => {
              window.location.reload();
              this.visible = false;
            },
            error: (error) => {
              console.log(error);
              if (error.status === 20001) {
                alert('ჩაწერეთ განსხვავებული ბარკოდი')
              }
            },
          });
        } else {
          alert("რაოდენობა არ შეიძლება იყოს 0")
          return
        }
      } else {
        this.addProducts.markAllAsTouched();
      }
    } else if (this.activeTabIndex === 1) {
      if (this.exitProducts.valid) {
        if (this.exitProducts.value.quantity?.toString() !== "0") {
          this.exitProducts.value.warehouse_name = this.warehouseName;
          const date = this.exitProducts.value.exit_date;
          const formattedDate = this.datePipe.transform(date, 'dd-MMM-yyyy');
          this.exitProducts.value.exit_date = formattedDate;

          this.dataService.addExitProducts(this.exitProducts.value as Product).subscribe({
            next: (response) => {
              window.location.reload();
              this.visible = false;
            },
            error: (error) => {
              console.log(error);
              if (error.status === 20001) {
                alert('საწყობში არ არის საკმარისი რაოდენობის პროდუცქია')
              }
            },
          });
        } else {
          alert("რაოდენობა არ შეიძლება იყოს 0")
          return
        }
      } else {
        this.exitProducts.markAllAsTouched();
      }
    } else {
      if (this.addWarehouse.valid) {
        this.addWarehouse.value.company_id = this.companyId;
        this.dataService.addWarehouse(this.addWarehouse.value as Warehouse).subscribe({
          next: (response) => {
            window.location.reload();
            this.visible = false;
          },
          error: (error) => {
            console.log(error);
          },
        });
      } else {
        this.addWarehouse.markAllAsTouched();
      }
    }
  }

  OpenDialog(): void {
    this.visible = true;
  }
  products: any[] = [];
  selectedProducts = {};
  clear(table: Table) {
    table.clear();
  }
  getTabHeader(productGroup: any): string {
    const tabInfo = productGroup[productGroup.length - 1];
    return tabInfo.tab;
  }

  activeTabIndex: number = 0;
  headerDialog: string = '';

  onTabChange(event: TabViewChangeEvent) {
    this.activeTabIndex = event.index;
    if (this.activeTabIndex === 0) {
      this.headerDialog = 'პროდუქტის დამატება'; 
    } else {
      this.headerDialog = 'პროდუქტის გატანა';  
    }
  }

  ngOnInit(): void {
    if (this.activeTabIndex === 0) {
      this.headerDialog = 'პროდუქტის დამატება'; 
    } else {
      this.headerDialog = 'პროდუქტის გატანა';  
    }
    const managerId = Number(localStorage.getItem("id"));

    this.dataService.getWarehouseForUser(managerId).subscribe({
      next: (response) => {
        this.warehouseName = response?.warehouse;
        localStorage.setItem('warehouse_id', response?.warehouse_id);
        this.companyId = Number(localStorage.getItem("company_id")) || response.company_id;
        localStorage.setItem('company_id', response?.company_id);
        this.getEntry();
        this.getAllEntry();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getEntry() {
    if (this.role === 'operator') {
      const warehouse_id = Number(localStorage.getItem("warehouse_id"));
      this.dataService.getEntryProducts(warehouse_id).subscribe({
        next: (response) => {
          response.push({
            tab: 'tab 1',
            barcode: '',
            product_name: '',
            quantity: 0,
            warehouse_name: '',
            entry_date: '',
            exit_date: '',
            operator_id: 0,
            id: 0,
            name: '',
            lastname: ''
          });

          this.products.push(response);
          this.getExitProducts();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  getAllEntry() {
    if (this.role === 'manager') {
      this.dataService.getAllEntryProducts(this.companyId).subscribe({
        next: (response) => {
          response.push({
            tab: 'tab 1',
            barcode: '',
            product_name: '',
            quantity: 0,
            warehouse_name: '',
            entry_date: '',
            exit_date: '',
            operator_id: 0,
            id: 0,
            name: '',
            lastname: ''
          });

          this.products.push(response);
          this.getAllExitProducts();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
  getAllExitProducts() {
    this.dataService.getAllExitProducts(this.companyId).subscribe({
      next: (response: Product[]) => {
        response.push({
          tab: 'tab 2',
          barcode: '',
          product_name: '',
          quantity: 0,
          warehouse_name: '',
          entry_date: '',
          exit_date: '',
          operator_id: 0,
          id: 0,
          name: '',
          lastname: ''
        });


        this.products.push(response);
        this.getAllCurrentBalance();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAllCurrentBalance() {
    this.dataService.getAllCurrentBalance(this.companyId).subscribe({
      next: (response) => {
        response.push({
          tab: 'tab 3',
          barcode: '',
          product_name: '',
          current_balance: 0,
          warehouse_name: '',
        });
        this.products.push(response);
        this.getWarehouses();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getWarehouses() {
    this.dataService.getWarehouses(this.companyId).subscribe({
      next: (response) => {
        response.push({
          tab: 'tab 4',
          warehouse: '',
          id: 0,
          address: ''
        });
        this.products.push(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


  getExitProducts() {
    const warehouse_id = Number(localStorage.getItem("warehouse_id"));
    this.dataService.getExitProducts(warehouse_id).subscribe({
      next: (response) => {
        response.push({
          tab: 'tab 2',
          barcode: '',
          product_name: '',
          quantity: 0,
          warehouse_name: '',
          entry_date: '',
          exit_date: '',
          operator_id: 0,
          id: 0,
          name: '',
          lastname: ''
        });


        this.products.push(response);
        this.getCurrentBalance(warehouse_id);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getCurrentBalance(id: number) {
    const warehouse_id = Number(localStorage.getItem("warehouse_id"));

    this.dataService.getCurrentBalance(warehouse_id).subscribe({
      next: (response) => {
        response.push({
          tab: 'tab 3',
          barcode: '',
          product_name: '',
          warehouse_name: '',
          current_balance: 0,
          id: 0,
          name: '',
          lastname: ''
        });
        this.products.push(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


  openEditForm(product: any): void {
    if (this.activeTabIndex === 0) {
      const dateentry = dayjs(product.entry_date, 'DD-MMM-YYYY');
      const formattedentryDate = dateentry.format('YYYY-MM-DD');
      product.entry_date = formattedentryDate;
    } else {
      const dateexit = dayjs(product.exit_date, 'DD-MMM-YYYY');
      const formattedexitDate = dateexit.format('YYYY-MM-DD');
      product.exit_date = formattedexitDate;
    }


    if (this.role === 'manager' && this.activeTabIndex === 3 || this.role === 'operator' && this.activeTabIndex !== 2) {
      this.OpenEditForm = true;
    }
    if (this.role === 'manager' && this.activeTabIndex === 3) {
      this.editWarehouse = product as Warehouse;
    } else if (this.role === 'operator' && this.activeTabIndex === 0) {
      this.editEntry = product as Product
    } else if (this.role === 'operator' && this.activeTabIndex === 1) {
      this.editExit = product as Product;
    }
  }

  UpdateData(): void {

    if (this.role === 'manager') {
      this.dataService.UpdateWarehouse(this.editWarehouse, this.editWarehouse.id).subscribe({
        next: (response) => {
          this.OpenEditForm = false;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else if (this.role === 'operator') {
      if (this.activeTabIndex === 0) {
        const formattedDate = this.datePipe.transform(this.editEntry.entry_date, 'dd-MMM-yyyy');
        this.editEntry.entry_date = formattedDate;

        this.dataService.UpdateEntryProduct(this.editEntry, this.editEntry.id).subscribe({
          next: (response) => {
            this.OpenEditForm = false;
          },
          error: (error) => {
            console.log(error);
          },
        });
      } else if (this.activeTabIndex === 1) {
        const formattedDate = this.datePipe.transform(this.editExit.exit_date, 'dd-MMM-yyyy');
        this.editExit.exit_date = formattedDate;
        this.editExit.unit = this.selectedUnit

        this.dataService.UpdateExitProduct(this.editExit, this.editExit.id).subscribe({
          next: (response) => {
            this.OpenEditForm = false;
          },
          error: (error) => {
            console.log(error);
          },
        });
      }

    }


  }

  getBarcode(): string {
    return this.activeTabIndex === 0 ? this.editEntry.barcode : this.editExit.barcode;
  }

  setBarcode(value: string): void {
    if (this.activeTabIndex === 0) {
      this.editEntry.barcode = value;
    } else {
      this.editExit.barcode = value;
    }
  }
  getProductName(): string {
    return this.activeTabIndex === 0 ? this.editEntry.product_name : this.editExit.product_name;
  }

  setProductName(value: string): void {
    if (this.activeTabIndex === 0) {
      this.editEntry.product_name = value;
    } else {
      this.editExit.product_name = value;
    }
  }
  getQuantity(): number | null {
    return this.activeTabIndex === 0 ? this.editEntry.quantity : this.editExit.quantity;
  }

  setQuantity(value: number): void {
    if (this.activeTabIndex === 0) {
      this.editEntry.quantity = value;
    } else {
      this.editExit.quantity = value;
    }
  }

}
