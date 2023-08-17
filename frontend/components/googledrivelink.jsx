export function GoogleDriveLink({ link }) {
  // Check if the link is from Google Drive
  console.log('link=', { link });
  const isGoogleDriveLink = link && link.includes('drive.google.com/file/d/');

  // Transform the Google Drive link if applicable
  const transformedLink = isGoogleDriveLink
    ? link.replace('/view?usp=sharing', '?raw=true')
    : link;
  console.log('transformedlink=', { transformedLink });

  return transformedLink;
}
