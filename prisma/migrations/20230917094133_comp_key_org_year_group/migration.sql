/*
  Warnings:

  - A unique constraint covering the columns `[year,organization_id]` on the table `OrganizationYearGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrganizationYearGroup_year_organization_id_key" ON "OrganizationYearGroup"("year", "organization_id");
