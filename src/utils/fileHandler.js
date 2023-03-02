const buildChunkName = (file, index) => `${file.name}-${index}`

/**
 * 接收源文件，返回分片函数
 * @param {File} file 源文件
 * @param {number} chunkSize 分片大小
 * @param {boolean} isBlob 
 * @returns 
 */
function fileHandler(file, chunkSize, isBlob = false) {
    const chunkNums = Math.ceil(file.size / chunkSize)
    return {
        getChunk: (index) => {
            const chunkBlob = file.slice(index * chunkSize, (index + 1) * chunkSize)
            if (isBlob) return chunkBlob
            const chunkFileName = buildChunkName
            return new File(
                [chunkBlob],
                chunkFileName(file, index), {
                type: file.type
            })
        },
        chunkNums
    }
}


export default fileHandler