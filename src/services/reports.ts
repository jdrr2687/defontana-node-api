import {
  lastMonthSales,
  topBrand,
  topLocal,
  topProduct,
  topProductLocal,
  topSale,
} from "../repositories/reports";

export const getLastMonthSales = async () => {
  const responseData = await lastMonthSales();
  return {
    reportName: "1. El total de ventas de los ultimos 30 dias",
    data: responseData,
  };
};

export const getTopSale = async () => {
  const responseData = await topSale();
  return {
    reportName:
      "2. El dia y hora en que se realizo la venta con el monto mas alto y cual es el monto mas alto",
    data: responseData,
  };
};

export const getTopProduct = async () => {
  const responseData = await topProduct();

  return {
    reportName:
      "3. Indicar cual es el producto con mayor monto total de ventas",
    data: responseData,
  };
};

export const getTopLocal = async () => {
  const responseData = await topLocal();

  return {
    reportName: "4. Indicar el local con mayor monto de ventas",
    data: responseData,
  };
};

export const getTopBrand = async () => {
  const responseData = await topBrand();

  return {
    reportName: "5. Cual es la marca con mayor margen de ganancia?",
    data: responseData,
  };
};

export const getTopProductLocal = async () => {
  const responseData = await topProductLocal();
  return {
    reportName: "6. Como obtendrias el producto que mas se vende en cada local",
    data: responseData,
  };
};
