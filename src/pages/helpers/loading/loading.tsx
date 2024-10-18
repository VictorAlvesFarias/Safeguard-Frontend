import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Content from "../../../components/content"
import { LoaderCircle } from "lucide-react"
import React from "react"

interface LoadingPageProps {
  loading: boolean
}

function Loading(props: LoadingPageProps) {
  return (
    props.loading &&
    <div className='flex w-full h-full items-center justify-center'>
      <LoaderCircle className='rotating-div' />
    </div>
  )
}

export default Loading