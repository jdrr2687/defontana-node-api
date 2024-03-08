import sql, { ConnectionPool } from "mssql";
import dbConfig from "../config/datatabase";
import { TopProduct, SalesData, TopSale, TopLocal, TopBrand, TopProductLocal } from "../models/interfaces";


export const lastMonthSales = async (): Promise<SalesData[]> => {
  const pool: ConnectionPool = await sql.connect(dbConfig.sql);

  const responseData: any = await pool.request().query(
    `SELECT COUNT(V.ID_Venta) cantidadVentas, SUM(V.Total) totalVentas FROM Venta V 
        INNER JOIN VentaDetalle VD ON VD.ID_Venta = V.ID_Venta
        WHERE V.Fecha >= DATEADD(day, -30, GETDATE()) AND V.Fecha <= GETDATE()`
  )

  return responseData.recordset;
}

export const topSale = async (): Promise<TopSale[]> => {
  const pool: ConnectionPool = await sql.connect(dbConfig.sql);

  const responseData: any = await pool.request().query(
    `SELECT TOP 1 V.ID_Venta ventaID, fecha, total FROM Venta V ORDER BY Total DESC`
  );

  return responseData.recordset;
}



export const topProduct = async (): Promise<TopProduct[]> => {
  const pool: ConnectionPool = await sql.connect(dbConfig.sql);

  const responseData: any = await pool.request().query(
    `SELECT TOP 1 ID_Producto productoID, SUM(TotalLinea) AS totalVenta
        FROM VentaDetalle
        GROUP BY ID_Producto
        ORDER BY totalVenta DESC;`
  );

  return responseData.recordset;
}



export const topLocal = async (): Promise<TopLocal[]> => {
  const pool: ConnectionPool = await sql.connect(dbConfig.sql);

  const responseData: any = await pool.request().query(
    `SELECT top 1 ID_Local localID, SUM(Total) AS total
    FROM Venta
    GROUP BY ID_Local
    ORDER BY total DESC`
  );

  return responseData.recordset;
}

export const topBrand = async (): Promise<TopBrand[]> => {
  const pool: ConnectionPool = await sql.connect(dbConfig.sql);

  const responseData: any = await pool.request().query(
    `SELECT top 1 M.ID_Marca marcaID, SUM( (VD.Cantidad *  VD.Precio_Unitario) -  (VD.Cantidad * P.Costo_Unitario)) AS margen
    FROM VentaDetalle VD
    inner join Producto P on P.ID_Producto =  VD.ID_Producto
    inner join Marca M on M.ID_Marca = P.ID_Marca
    GROUP BY  M.ID_Marca
    ORDER BY margen DESC;`
  );

  return responseData.recordset;
}


export const topProductLocal = async (): Promise<TopProductLocal[]> => {
  const pool: ConnectionPool = await sql.connect(dbConfig.sql);

  const responseData: any = await pool.request().query(
    `WITH VentasPorLocal AS ( SELECT 
      v.ID_Local localID, 
      vd.ID_Producto productoID, 
      SUM(vd.Cantidad) AS totalVendido,
      ROW_NUMBER() OVER (PARTITION BY v.ID_Local ORDER BY SUM(vd.Cantidad) DESC) AS Ranking
  FROM VentaDetalle vd
inner join Venta v on vd.ID_Venta =  v.ID_Venta
  GROUP BY   v.ID_Local, vd.ID_Producto
)
SELECT  localID,  productoID, totalVendido
FROM VentasPorLocal
WHERE Ranking = 1
order by localID`
  );

  return responseData.recordset;
}