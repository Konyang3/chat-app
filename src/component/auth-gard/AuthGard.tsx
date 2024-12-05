import React, { useEffect } from "react"
import { useAppDispatch } from "../../reducer/hook"
import { Outlet, useNavigate } from "react-router-dom"
import { setId, setSubjectList } from "../../reducer/appSlice"
import { buildUrl } from "../../util/util"

export default function AuthGard() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(buildUrl('/user'), {
            method: 'get',
            headers: {'content-type': "application/json"},
            credentials: "include"
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((value) => {
                    dispatch(setId(value.id))
                    dispatch(setSubjectList(value.subjectCodes))
                })
            } else {
                alert('로그인이 필요합니다.')
                navigate('/')
            }
        }).catch(() => {
            alert('로그인이 필요합니다.')
        })
    }, [])

    return <Outlet />
}