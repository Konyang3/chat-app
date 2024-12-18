import { Button, Calendar, CalendarProps } from "antd"
import { Dayjs } from "dayjs";
import { format } from 'date-fns'
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../reducer/hook";
import { selectIsStudent } from "../../reducer/appSlice";
import { buildUrl } from "../../util/util";

export default function CalendarView() {
    const {subjectName, subjectCode} = useParams()
    const [chatDateList, setChatDateList] = useState<{date: Date; isClose: boolean}[]>([])
    const isStudent = useAppSelector(selectIsStudent)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async function() {
            const today = new Date()
            const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

            fetch(buildUrl('/chat-date-list'), {
                method: 'post',
                body: JSON.stringify({startDate, endDate, subjectCode}), 
                headers: {'content-type': "application/json"},
                credentials: "include"
            }).then((res) => {
                res.json().then((value) => {
                    const dateList = value.map((date: any) => ({date: new Date(date.date), isClose: Boolean(date.close)}))

                    setChatDateList(dateList)
                }).catch((e) => {
                    alert('채팅 기록을 불러오는데 실패하였습니다.')
                })
            }).catch((e) => {
                alert('채팅 기록을 불러오는데 실패하였습니다.')
            })
        })();
    }, [])

    const enterChat = (date: Date) => () => {
        navigate(`/chat/${subjectCode}/${subjectName}/${format(date, 'yyyy-MM-dd')}`)
    }

    const createChat = () => {
        const date = new Date()

        fetch(buildUrl('/create-chat'), 
            {method: 'post', body: JSON.stringify({subjectCode, date}), headers: {'content-type': "application/json"}, credentials: "include"}
        ).then((res) => {
            if (res.status === 200) {
                enterChat(date)()
            } else {
                alert('채팅방 생성에 실패하였습니다.')
            }
        }).catch(() => {
            alert('채팅방 생성에 실패하였습니다.')
        })
    }

    const isChatExist = (value: Dayjs) => {
        return chatDateList.find((date) => {
            return format(date.date, 'yyyy-MM-dd') === format(value.toDate(), 'yyyy-MM-dd')
        })
    };

    const dateCellRender = (value: Dayjs) => {
        const chatRoomData = isChatExist(value)

        return (
            <>
                {chatRoomData ? <Button onClick={enterChat(chatRoomData.date)}>채팅방 입장하기</Button> : 
                value.isToday() && !isStudent ? <Button onClick={createChat}>채팅 시작하기</Button> : null}
            </>
        );
    };    

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        return info.originNode;
    };

    return (
        <div>
            <Calendar cellRender={cellRender} />
        </div>
    )
}