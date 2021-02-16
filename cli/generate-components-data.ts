import { writeFile, readFile } from 'fs/promises'
import { dirname, join } from 'path'
import globby from 'globby'

function getDirsRecursive(path: string): Promise<string[]> {
  return globby(path).then((pathList: string[]) =>
    Array.from(new Set(pathList.map((pathItem: string) => dirname(pathItem))))
      .map((pathItem) => join('~/', pathItem))
      .sort(
        (pathA, pathB) =>
          pathB.split(/[\\/]/).filter(Boolean).length -
          pathA.split(/[\\/]/).filter(Boolean).length
      )
  )
}

async function main() {
  const componentsJsonPath = 'constants/components.json'

  const oldData = JSON.parse(
    await readFile(componentsJsonPath, 'utf-8')
  ) as string[]
  const newData = await getDirsRecursive('components/**/*.vue')

  if (oldData.length === newData.length) {
    console.info('components.json is not updated')
    return
  }

  await writeFile(componentsJsonPath, JSON.stringify(newData, null, 2))
  console.info('components.json is updated')
}

;(async () => {
  await main()
})()
