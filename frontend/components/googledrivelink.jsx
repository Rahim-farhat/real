export function GoogleDriveLink({ link }) {
  // Check if the link is from Google Drive
  console.log('link=', { link });
  const isGoogleDriveLink = link && link.includes('drive.google.com');

  // Transform the Google Drive link if applicable
  const transformedLink = isGoogleDriveLink
    ? link
        .replace('/file/d/', '/uc?export=view&id=')
        .replace('/view?usp=drive_link', '')
    : link;
  console.log('transformedlink=', { transformedLink });

  return transformedLink;
}
