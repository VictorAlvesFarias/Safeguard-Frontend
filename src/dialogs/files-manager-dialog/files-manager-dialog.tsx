import React, { useContext, useEffect, useState } from 'react'
import ModalClose from '../../base-components/modal-close'
import Button from '../../components/button'
import { fileService } from '../../services/files-service'
import { useQuery } from '../../utils/hooks/query-hooks'
import { FileEntity } from '../../interfaces/entities/file-entity'
import { ModalContextObject } from '../../base-components/modal-context'
import { Plus, TrashIcon } from 'lucide-react'
import CardLoading from '../../pages/helpers/loading/card-loading'
import { base64ToImage } from '../../utils/extensions/image'
import Loading from '../../components/loading'
import If from '../../base-components/if'

function FilesManagerDialog({ callback }: { callback: (e: FileEntity) => any }) {
  const [finished, setQuery] = useQuery();
  const [files, setFiles] = useState<FileEntity[]>();
  const [selected, setSelected] = useState<FileEntity>();
  const { setOpen } = useContext(ModalContextObject)

  function handleGetFiles() {
    return fileService.getAll()
      .then(e => {
        setFiles(e.res)
      })
  }
  function handleSelectItem() {
    if (selected != null) {
      callback(selected)
      setOpen(false)
    }
  }
  function handleDeleteFile(id: number) {
    return fileService.remove(id)
      .then(e => {
        setQuery(() => handleGetFiles())
      })
  }
  function handleAddFile(file) {
    return fileService.add({ image: file })
      .then(e => {
        setQuery(() => handleGetFiles())
      })
  }
  function handleFile(image: any) {
    const file = image.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function (event: any) {
      setQuery(() => handleAddFile(file))
    };
  }

  useEffect(() => {
    setQuery(() => handleGetFiles())
  }, [])

  return (
    <div className='shadow-lg p-12 relative bg-main-black-800 flex-1 h-full flex flex-col gap-3 rounded text-white'>
      {!finished && <div className='flex h-full w-full center'>
        <Loading />
      </div>}
      <div aria-hidden={!finished} className='flex h-fit w-full overflow-auto aria-hidden:hidden'>
        <div className='grid sm:grid-cols-2 xl:grid-cols-3 h-full w-full gap-3'>
          <label htmlFor="add-image" className='cursor-pointer bg-tertiary rounded flex-col h-48 flex relative items-center justify-center'>
            <input className="hidden" type="file" onChange={handleFile} id="add-image" />
            <div className='w-full h-full flex flex-col gap-3 rounded center '  >
              <p className='font-semibold'>
                <Plus></Plus>
              </p>
            </div>
          </label>
          {files?.map((item, index) =>
            <div onClick={() => setSelected(item)} aria-selected={selected == item} key={index} className='cursor-pointer bg-tertiary rounded flex-col h-48 flex relative items-center justify-center group aria-selected:border-2 aria-selected:border-main-violet-500'>
              <button onClick={() => handleDeleteFile(item.id)} className='transition-all cursor-pointer z-20 opacity-0 p-3 group-hover:opacity-100 absolute top-0 right-0 hover:text-red-400 '>
                <TrashIcon />
              </button>
              <div className='w-full h-full flex flex-col gap-3 rounded center '  >
                <img className='w-16' src={base64ToImage(item.storedFile.base64, item.storedFile.mimeType)} alt={item.storedFile.name} />
                <p className='font-semibold'>
                  {item?.storedFile.name}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='flex gap-3 max-w-80 flex-1 justify-end flex-col'>
          <div className='w-1/2'>
            <Button disabled={selected == null} onClick={handleSelectItem} variation='default-full'>Selecionar</Button>
          </div>
        <ModalClose className='w-9 h-9 absolute top-0 right-0 m-3'>
          <Button variation='red'>X</Button>
        </ModalClose>
      </div>
    </div>
  )
}

export default FilesManagerDialog