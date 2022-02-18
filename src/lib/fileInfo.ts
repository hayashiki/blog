import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const dirPath = path.join('contents/posts')

export const getFilenames = (): string[] => {
  const files = fs.readdirSync(dirPath)

  return files.map((filename) => filename.replace('.md', ''))
}

export const getFileContentWithMeta = (filenames: string | string[]) => {
  let filenameList: string[] = []
  if (!(filenames instanceof Array)) {
    filenameList.push(filenames)
  } else {
    filenameList = filenames
  }

  const markdownWithMetadata = filenameList
    .map((filename) => fs.readFileSync(path.join(dirPath, filename + '.md')).toString())
    .map((data) => matter(data))

  return markdownWithMetadata
}
