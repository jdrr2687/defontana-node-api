-- 1. El total de ventas de los ultimos 30 dias
SELECT COUNT(V.ID_Venta) cantidadVentas, SUM(V.Total) totalVentas FROM Venta V 
    INNER JOIN VentaDetalle VD ON VD.ID_Venta = V.ID_Venta
    WHERE V.Fecha >= DATEADD(day, -30, GETDATE()) AND V.Fecha <= GETDATE()

-- 2. El dia y hora en que se realizo la venta con el monto mas alto y cual es el monto mas alto
SELECT TOP 1 V.ID_Venta ventaID, fecha, total FROM Venta V ORDER BY Total DESC;

-- 3. Indicar cual es el producto con mayor monto total de ventas

SELECT top 1 ID_Producto productoID, SUM(TotalLinea) AS totalVentas
FROM VentaDetalle
GROUP BY ID_Producto
ORDER BY totalVentas DESC;

-- 4. Indicar el local con mayor monto de ventas
SELECT top 1 ID_Local localID, SUM(Total) AS total
FROM Venta
GROUP BY ID_Local
ORDER BY total DESC

--5. Cual es la marca con mayor margen de ganancia?

SELECT top 1 M.ID_Marca marcaID, SUM( (VD.Cantidad *  VD.Precio_Unitario) -  (VD.Cantidad * P.Costo_Unitario)) AS margen
FROM VentaDetalle VD
inner join Producto P on P.ID_Producto =  VD.ID_Producto
inner join Marca M on M.ID_Marca = P.ID_Marca
GROUP BY  M.ID_Marca
ORDER BY margen DESC;

--6. Como obtendrias el producto que mas se vende en cada local

 WITH VentasPorLocal AS ( SELECT 
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
order by localID
