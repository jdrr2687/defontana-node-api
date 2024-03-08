export interface Config {
    port: string;
    host: string;
    url: string;
    sql: {
        server: string;
        database: string;
        user: string;
        password: string;
        options: {
            encrypt: boolean;
            enableArithAbort: boolean;
        };
    };
}

export interface TopProduct {
    productoID: Number
    totalVentas: number
  }


  export interface SalesData {
    cantidadVentas: Number
    totalVentas: number
  }


  export interface TopSale {
    ventaID: Number
    fecha: string
    total:number
  }

  export interface TopLocal {
    localID: Number
    total: number
  }

  export interface TopBrand {
    marcaID: Number
    margen: number
  }

  export interface TopProductLocal {
    localID: Number
    productoID: number
    totalVendido: number
  }
