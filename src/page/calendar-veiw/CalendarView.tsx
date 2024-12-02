import { Button, Calendar, CalendarProps } from "antd"
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function CalendarView() {
    const {subjectName, subjectCode} = useParams()
    const [chatDateList, setChatDateList] = useState<Date[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        (async function() {
            const today = new Date()
            const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

            fetch("http://localhost:8080/chat-date-list", {
                method: 'post',
                body: JSON.stringify({startDate, endDate, subjectCode}), 
                headers: {'content-type': "application/json"},
                credentials: "include"
            }).then((res) => {
                res.json().then((value) => {
                    const dateList = value.map((date: any) => new Date(date.date))

                    setChatDateList(dateList)
                }).catch((e) => {
                    alert('채팅 기록을 불러오는데 실패하였습니다.')
                })
            }).catch((e) => {
                alert('채팅 기록을 불러오는데 실패하였습니다.')
            })
        })();
    }, [])

    const enterChat = () => {
        navigate(`/chat/${subjectCode}/${subjectName}`)
    }

    const isChatExist = (value: Dayjs) => {
        return chatDateList.find((date) => {
            return dayjs(date).diff(value, 'day') === 0
        })
    };

    const dateCellRender = (value: Dayjs) => {
        return (
            <>
                {isChatExist(value) ? <Button onClick={enterChat}>채팅방 입장하기</Button> : null}
                {value.isToday() ? <Button onClick={enterChat}>채팅 시작하기</Button> : null}
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