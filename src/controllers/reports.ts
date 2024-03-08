import { Request, Response, NextFunction } from "express";
import {
  getLastMonthSales,
  getTopSale,
  getTopProduct,
  getTopLocal,
  getTopBrand,
  getTopProductLocal,
} from "../services/reports";

export const getReport = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    switch (Number(_req.params.id)) {
      case 1:
        res.send(await getLastMonthSales())
        break
      case 2:
        res.send(await getTopSale())
        break
      case 3:
        res.send(await getTopProduct())
        break
      case 4:
        res.send(await getTopLocal())
        break
      case 5:
        res.send(await getTopBrand())
        break
      case 6:
        res.send(await getTopProductLocal())
        break
     default:
         res.send("No existe reporte con el id ingresado.")
        break;
    }
  } catch (error) {
    let errorMessage = "Failed to do something exceptional";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
  }
};
