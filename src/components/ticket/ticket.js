import React from 'react'
import { add, intervalToDuration } from 'date-fns'

import './ticket.scss'

function Ticket({ price, carrier, segments }) {
  return (
    <div className="ticket">
      <div className="ticket-header">
        <p className="price">{price} Р</p>
        <img alt="airline-logo" src={`https://pics.avs.io/99/36/${carrier}.png`} className="logo" />
      </div>
      {segments.map((s) => {
        const originDate = new Date(s.date)
        const destinationDate = add(originDate, { minutes: s.duration })

        const time = `${originDate.getHours()}:${originDate.getMinutes()} - ${destinationDate.getHours()}:${destinationDate.getMinutes()}`

        const durr = intervalToDuration({
          start: originDate,
          end: destinationDate,
        })
        return (
          <div className="ticket-info" key={s.date}>
            <p className="details">
              <span className="secondary">
                {s.origin} - {s.destination}
              </span>
              <span className="primary">{time}</span>
            </p>
            <p className="details">
              <span className="secondary">В ПУТИ</span>
              <span className="primary">{`${durr.hours}ч ${durr.minutes}м`}</span>
            </p>
            <p className="details">
              <span className="secondary">{s.stops.length} ПЕРЕСАДКИ</span>
              <span className="primary">{s.stops.join(', ')}</span>
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default Ticket
