import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import History from '../../features/history'

function InternalPage(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "History"}))
      }, [])
      
    return(
        <History />
    )
}

export default InternalPage