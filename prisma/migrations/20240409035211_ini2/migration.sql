-- CreateTable
CREATE TABLE "dbteste"."Client" (
    "uuid" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "wsempresa" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "dbteste"."Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_wsempresa_key" ON "dbteste"."Client"("wsempresa");
