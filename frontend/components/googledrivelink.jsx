export function GoogleDriveLink({ link }) {
  // Check if the link is from Google Drive
  const isGoogleDriveLink = link && link.includes('drive.google.com/file/d/');

  // Transform the Google Drive link if applicable
  const transformedLink = isGoogleDriveLink
    ? link
        .replace('/file/d/', '/uc?export=view&id=')
        .replace('/view?usp=drive_link', '')
    : link;

  return transformedLink;
}
