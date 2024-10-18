import React from 'react'

function Pagination({pagination,finished}) {
    return (
        <div className='flex gap-3 border-t-black border-opacity-10 border-t pt-6'>
            {pagination.pages?.map((e, i) =>
                <span
                    onClick={() => finished ? pagination.setPage(e.page): null}
                    aria-disabled={!finished}
                    key={i}
                    aria-checked={e.current}
                    className='bg-zinc-400 cursor-pointer aria-checked:bg-zinc-300 rounded flex items-center justify-center w-7 h-7'>
                    {e.page}
                </span>
            )}
            {pagination.filters.page <= pagination.totalPages - pagination.counter && <>
                <div className='h-7 items-end flex gap-0.5 '>
                    <div className='black w-0.5 h-0.5 rounded-full bg-black'></div>
                    <div className='black w-0.5 h-0.5 rounded-full bg-black'></div>
                    <div className='black w-0.5 h-0.5 rounded-full bg-black'></div>
                </div>
                <span
                    aria-disabled={!finished}
                    onClick={() => finished ? pagination.setPage(pagination.totalPages): null}
                    className='bg-zinc-400 cursor-pointer aria-checked:bg-zinc-300 rounded flex items-center justify-center w-7 h-7'>
                    {(pagination.totalPages)}
                </span>
            </>}
        </div>
    )
}

export default Pagination