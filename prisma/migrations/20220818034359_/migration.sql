-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isVolunteer" BOOLEAN NOT NULL DEFAULT false,
    "photo" TEXT,
    "rut" TEXT,
    "volunteerType" TEXT,
    "patente" TEXT,
    "sector" TEXT,
    "organizationName" TEXT,
    "organizationId" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alerts" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "specie" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "photo" TEXT,
    "userPhone" TEXT,
    "volunteerPhone" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Abierto',
    "userName" TEXT NOT NULL,
    "userId" INTEGER,
    "alertCategoryName" TEXT NOT NULL,
    "alertCategoryId" INTEGER,
    "providedElementName" TEXT,
    "neededElementName" TEXT NOT NULL,
    "volunteerName" TEXT,
    "volunteerId" INTEGER,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isFoundation" BOOLEAN NOT NULL DEFAULT false,
    "photo" TEXT,
    "email" TEXT,
    "phoneNum" TEXT,
    "socialMedia" TEXT,
    "certificationDocument" TEXT,
    "rutFoundation" TEXT,
    "namePresidente" TEXT NOT NULL,
    "rutPresidente" TEXT,
    "nameSecretario" TEXT NOT NULL,
    "rutSecretario" TEXT,
    "nameTesorero" TEXT NOT NULL,
    "rutTesorero" TEXT,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "organizationName" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "categoryName" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "photo" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alertCategories" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "alertCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alertElements" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "alertElements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProvidedElements" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NeededElements" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_name_key" ON "organizations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "alertCategories_name_key" ON "alertCategories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProvidedElements_AB_unique" ON "_ProvidedElements"("A", "B");

-- CreateIndex
CREATE INDEX "_ProvidedElements_B_index" ON "_ProvidedElements"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NeededElements_AB_unique" ON "_NeededElements"("A", "B");

-- CreateIndex
CREATE INDEX "_NeededElements_B_index" ON "_NeededElements"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_alertCategoryId_fkey" FOREIGN KEY ("alertCategoryId") REFERENCES "alertCategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProvidedElements" ADD CONSTRAINT "_ProvidedElements_A_fkey" FOREIGN KEY ("A") REFERENCES "alerts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProvidedElements" ADD CONSTRAINT "_ProvidedElements_B_fkey" FOREIGN KEY ("B") REFERENCES "alertElements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NeededElements" ADD CONSTRAINT "_NeededElements_A_fkey" FOREIGN KEY ("A") REFERENCES "alerts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NeededElements" ADD CONSTRAINT "_NeededElements_B_fkey" FOREIGN KEY ("B") REFERENCES "alertElements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
