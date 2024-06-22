-- Agregar la columna "role" con un valor predeterminado temporal
ALTER TABLE "RegisterModel" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'user';

-- Si deseas eliminar el valor predeterminado después de agregar la columna
ALTER TABLE "RegisterModel" ALTER COLUMN "role" DROP DEFAULT;
