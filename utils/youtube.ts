export function getYoutubeId(youtubeUrl: string): string | undefined {
  // RegEx taken from: https://stackoverflow.com/a/6904504
  const result =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi.exec(
      youtubeUrl || ''
    ) as RegExpExecArray

  return result && result[1]
}

export function getYoutubeIdFromThumbnail(
  youtubeThumbnail: string
): string | undefined {
  // RegEx taken from: https://stackoverflow.com/a/7882155/7711812
  const result = /\/vi\/(.*)\//gi.exec(
    youtubeThumbnail || ''
  ) as RegExpExecArray

  return result && result[1]
}
