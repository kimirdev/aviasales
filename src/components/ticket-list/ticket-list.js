import { Alert } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { showMore } from '../../store/ticketsReducer'
import Loader from '../loader'
import Ticket from '../ticket'

import './ticket-list.scss'

function TicketList({ tickets }) {
  const dispatch = useDispatch()
  const isLoading = useSelector((store) => store.tickets.isLoading)

  return (
    <div className="ticket-list">
      <ul>
        {isLoading && <Loader />}
        {!isLoading && !tickets.length && (
          <Alert
            message="Рейсы не найдены."
            description="Рейсов, подходящих под заданные фильтры, не найдено"
            type="warning"
            showIcon
          />
        )}
        {tickets.map((t) => (
          <li key={t.segments[0].date}>
            <Ticket price={t.price} carrier={t.carrier} segments={t.segments} />
          </li>
        ))}
      </ul>
      {!!tickets.length && (
        <button type="button" className="show-more" onClick={() => dispatch(showMore())}>
          Показать еще 5 билетов!
        </button>
      )}
    </div>
  )
}

export default TicketList
