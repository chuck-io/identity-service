-- AlterTable
ALTER TABLE "user" ADD COLUMN     "person_registration_number_hash" TEXT;

-- CreateIndex
CREATE INDEX "user_person_registration_number_hash_idx" ON "user"("person_registration_number_hash");
