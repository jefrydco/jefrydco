// Taken from: https://github.com/geeogi/nuxt-responsive-loader/blob/master/lib/module.js
import consola from 'consola'
import type { Module } from '@nuxt/types'
import { Configuration as WebpackConfiguration } from 'webpack'
import {
  ExtendFunction,
  ExtendFunctionContext
} from '@nuxt/types/config/module'
import { NuxtResponsiveLoaderOptions } from '~/types'

const logger = consola.withScope('nuxt-responsive-loader')

function initNuxtResponsiveLoader(
  nuxtResponsiveLoaderOptions: NuxtResponsiveLoaderOptions
): ExtendFunction {
  return (config: WebpackConfiguration, ctx: ExtendFunctionContext) => {
    const fileNames = ctx.isDev
      ? '[path][name].[ext]'
      : 'img/[name].[contenthash:7].[ext]'

    /* Find the existing webpack loader which is responsible for images
     * There will be one by default for Nuxt projects.
     * See: https://github.com/nuxt/nuxt.js/blob/76b10d2d3f4e5352f1c9d14c52008f234e66d7d5/lib/builder/webpack/base.js#L203
     */
    const extensions = [
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.svg',
      '.webp',
      '.avif'
    ]
    const existingImageLoader = config.module?.rules.find((rule) =>
      extensions.every((ext) => (rule.test as RegExp).test(ext))
    )

    /* If the image loader rule has been removed or edited then we cannot continue.
     * It is not clear how to update the webpack rules.
     * The user should define a custom webpack configuration.
     */
    if (!existingImageLoader) {
      logger.error(
        [
          'Could not find the existing image loader rule.',
          ' The webpack config has been edited, perhaps by another Nuxt module.',
          ' To resolve this error try placing this module first in your Nuxt modules array',
          ' or use a custom webpack configuration instead.'
        ].join('')
      )
    }

    /* Update the loader so it's no longer responsible for png/jpe?g/webp/avif files */
    if (existingImageLoader) {
      existingImageLoader.test = /\.(gif|svg)$/i
    }

    /**
     * Add the new loader rule
     */
    config.module?.rules.push({
      test: /\.(png|jpe?g|webp|avif)$/i,
      loader: 'responsive-loader',
      options: {
        ...nuxtResponsiveLoaderOptions,
        name: fileNames
      } as NuxtResponsiveLoaderOptions
    })
  }
}

const nuxtResponsiveLoader: Module<NuxtResponsiveLoaderOptions> = function () {
  this.extendBuild(
    initNuxtResponsiveLoader(
      this.options.responsiveLoader as NuxtResponsiveLoaderOptions
    )
  )
}

export default nuxtResponsiveLoader
