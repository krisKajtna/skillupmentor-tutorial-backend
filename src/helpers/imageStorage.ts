const FileType = import('file-type')
import fs from 'fs'
import Logging from 'library/Logging'
import { diskStorage, Options } from 'multer'
import { extname } from 'path'
import { retry } from 'rxjs'

type vaildFileExtensionsType = 'png' | 'jpg' | 'jpeg'
type vaildMimeType = 'image/png' | 'image/jpg' | 'image/jpeg'

const vaildFileExtensions: vaildFileExtensionsType[] = ['png', 'jpg', 'jpeg']
const validMimeTypes: vaildMimeType[] = ['image/jpeg', 'image/jpg', 'image/png']

export const saveImageToStorage: Options = {
  storage: diskStorage({
    destination: './files',
    filename(req, file, callback) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      const ext = extname(file.originalname)
      const filename = `${uniqueSuffix}${ext}`

      callback(null, filename)
    },
  }),

  fileFilter(req, file, callback) {
    const allowedMimeTypes: vaildMimeType[] = validMimeTypes
    allowedMimeTypes.includes(file.mimetype as vaildMimeType) ? callback(null, true) : callback(null, false)
  },
}

export const isFileExtensionSafe = async (fullFilePath: string): Promise<boolean> => {
  return (await FileType).fileTypeFromFile(fullFilePath).then((fileExtensionAndMimeType) => {
    if (!fileExtensionAndMimeType.ext) {
      return false
    }
    const isFileTypeLegit = vaildFileExtensions.includes(fileExtensionAndMimeType.ext as vaildFileExtensionsType)
    const isMimeTypeLegit = validMimeTypes.includes(fileExtensionAndMimeType.mime as vaildMimeType)
    const isFileLegit = isFileTypeLegit && isMimeTypeLegit
    return isFileLegit
  })
}

export const removeFile = (fullFilePath: string): void => {
  try {
    fs.unlinkSync(fullFilePath)
  } catch (error) {
    Logging.error(error)
  }
}
