'use server';

import { postgres } from '@/lib/postgres';

const FILE_FIELDS = [
  'fupLocation',
  'fupTreeRights',
  'fupKhataExtract',
  'fupRightCertificate',
  'fupLicenseCertificate',
  'fupGPA',
] as const;

/** Validate Image by checking the magic bytes for JPEG or PNG */
async function readImageBuffer(file: File, fieldName: string): Promise<Uint8Array<ArrayBuffer>> {
  const allowedMime = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedMime.includes(file.type)) {
    throw new Error(
      `Field "${fieldName}": only JPG/JPEG/PNG files are accepted (got ${file.type}).`
    );
  }
  const arrayBuf = await file.arrayBuffer();
  // We specify <ArrayBuffer> to prevent TypeScript from inferring <ArrayBufferLike>
  // which causes an incompatibility with Prisma's expected Uint8Array type
  const bytes = new Uint8Array(arrayBuf as ArrayBuffer);

  if (bytes.length < 3) {
    throw new Error(`Field "${fieldName}": file is too small to be a valid image.`);
  }

  // JPEG magic bytes: 0xFF 0xD8 0xFF
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  // PNG magic bytes: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
  const isPng =
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a;

  if (!isJpeg && !isPng) {
    throw new Error(`Field "${fieldName}": file does not appear to be a valid JPEG or PNG image.`);
  }

  return bytes;
}

export async function submitForm(formData: FormData) {
  // Resolve file blobs
  const fileBuffers: Partial<Record<(typeof FILE_FIELDS)[number], Uint8Array<ArrayBuffer> | null>> =
    {};

  for (const field of FILE_FIELDS) {
    const entry = formData.get(field);
    if (entry instanceof File && entry.size > 0) {
      const bytes = await readImageBuffer(entry, field);
      fileBuffers[field] = bytes;
    } else {
      fileBuffers[field] = null;
    }
  }

  const str = (key: string) => (formData.get(key) as string | null) ?? '';

  const submission = await postgres.formSubmission.create({
    data: {
      areaType: str('areaType'),
      district: str('district'),
      taluk: str('taluk'),
      hobli: str('hobli'),
      village: str('village'),
      urbanArea: str('urbanArea'),
      surveyNo: str('surveyNo'),
      khataNo: str('khataNo'),
      acres: str('acres'),
      guntas: str('guntas'),
      anna: str('anna'),
      applicantType: str('applicantType'),
      applicantName: str('applicantName'),
      address: str('address'),
      applicantDistrict: str('applicantDistrict'),
      applicantTaluk: str('applicantTaluk'),
      pincode: str('pincode'),
      mobile: str('mobile'),
      email: str('email'),
      aadhaarNo: str('aadhaarNo'),
      landOwnerName: str('landOwnerName'),
      landOwnerAddress: str('landOwnerAddress'),
      landOwnerDistrict: str('landOwnerDistrict'),
      landOwnerTaluk: str('landOwnerTaluk'),
      east: str('east'),
      west: str('west'),
      north: str('north'),
      south: str('south'),
      purpose: str('purpose'),
      surveyBoundary: str('surveyBoundary'),
      govtSite: str('govtSite'),
      govtSiteDetails: str('govtSiteDetails'),
      consent: str('consent'),
      license: str('license'),
      fupLocation: fileBuffers.fupLocation,
      fupTreeRights: fileBuffers.fupTreeRights,
      fupKhataExtract: fileBuffers.fupKhataExtract,
      fupRightCertificate: fileBuffers.fupRightCertificate,
      fupLicenseCertificate: fileBuffers.fupLicenseCertificate,
      fupGPA: fileBuffers.fupGPA,
      declaration: str('declaration'),
    },
  });

  return { success: true, id: submission.id };
}
