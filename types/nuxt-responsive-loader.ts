// Taken from: https://github.com/dazuaz/responsive-loader#writing-your-own-adapter
export type ResponsiveLoaderAdapter = (
  imagePath: string
) => {
  metadata: () => Promise<{ width: number; height: number }>
  resize: (config: {
    width: number
    mime: string
    options: Object
  }) => Promise<{ data: Buffer; width: number; height: number }>
}

export type NuxtResponsiveLoaderOptions = {
  name?: string
  size: number
  placeholder: boolean
  quality: number
  adapter: ResponsiveLoaderAdapter
}
